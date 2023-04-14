import crypto from "crypto";
import { Redis } from "ioredis";

/**
 * This function generates a secure six-digit OTP (one-time password) using
 * crypto.randomBytes. First 4 bytes from the buffer as an unsigned 32-bit big-endian integer
 * and then takes the modulo 1000000 (i.e., 10^6) to ensure that the OTP is a 6-digit number.
 * @returns A 6-digit secure OTP (One-Time Password) as a number.
 */
export const generateSecureOTP = (): number => {
  const buffer = crypto.randomBytes(4);
  const OTP = buffer.readUInt32BE(0) % 1000000;
  return Number(OTP.toString().padStart(6, "0"));
};

/**
 * This function takes in an OTP (one-time password) as a number, hashes it using SHA-256 algorithm,
 * and returns the hashed value as a hexadecimal string.
 * @param {number} otp - The `otp` parameter is a number that represents a one-time password.
 * @returns The function `hashOTP` returns a string which is the hexadecimal representation of the
 * SHA-256 hash of the input `otp` number.
 */
export const hashOTP = (otp: number): string => {
  const hash = crypto.createHash("sha256");
  hash.update(otp.toString());
  return hash.digest("hex");
};

/**
 * This function stores an OTP hash in Redis for a given email address with a 5 minute expiration time.
 * @param {string} mail - The email address of the user for whom the OTP hash is being stored.
 * @param {string} hash - The `hash` parameter is a string representing the one-time password (OTP)
 * hash that will be stored in Redis. The OTP hash is typically generated by applying a cryptographic
 * hash function to the OTP value and a secret key.
 */
export const storeOTPHash = async (mail: string, hash: string) => {
  const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL!);
  await redis.set(`otpHash:${mail}`, hash, "EX", 60 * 5);
  redis.disconnect();
};

/**
 * This is a TypeScript function that reads an OTP hash from Redis based on a given email address.
 * @param {string} mail - The `mail` parameter is a string representing the email address for which the
 * OTP (One-Time Password) hash is being retrieved from Redis.
 * @returns The function `readOTPHash` returns a Promise that resolves to a string or null value. The
 * string value is the OTP hash associated with the provided email address, which is retrieved from a
 * Redis database. If there is no OTP hash associated with the email address, the function returns
 * null.
 */
export const readOTPHash = async (mail: string): Promise<string | null> => {
  const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL!);
  const response = await redis.get(`otpHash:${mail}`);
  redis.disconnect();

  return response;
};

/**
 * The function verifies if the hashed OTP matches the hashed OTP stored in the database for a given
 * email.
 * @param {string} mail - A string representing the email address of the user who is trying to verify
 * their OTP (One-Time Password).
 * @param {number} otp - The `otp` parameter is a number representing the One-Time Password that needs
 * to be verified.
 * @returns The function `verifyOTP` is returning a Promise that resolves to a boolean value. The
 * boolean value indicates whether the hashed OTP (one-time password) matches the hash stored for the
 * given email address.
 */
export const verifyOTP = async (
  mail: string,
  otp: number
): Promise<boolean> => {
  const hash = await readOTPHash(mail);
  const hashedOTP = hashOTP(otp);
  return hashedOTP === hash;
};
