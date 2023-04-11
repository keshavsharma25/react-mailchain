import crypto from "crypto";
import { Redis } from "ioredis";

export const generateSecureOTP = (): string => {
  const buffer = crypto.randomBytes(4);
  const OTP = buffer.readUInt32BE(0) % 1000000;
  return OTP.toString().padStart(6, "0");
};

export const hashOTP = (otp: number): string => {
  const hash = crypto.createHash("sha256");
  hash.update(otp.toString());
  return hash.digest("hex");
};

export const storeOTPHash = async (mail: string, hash: string) => {
  const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL!);
  await redis.set(`otpHash:${mail}`, hash, "EX", 60 * 5);
  redis.disconnect();
};

export const readOTPHash = async (mail: string): Promise<string | null> => {
  const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL!);
  const response = await redis.get(`otpHash:${mail}`);
  redis.disconnect();

  return response;
};

export const verifyOTP = async (
  mail: string,
  otp: number
): Promise<boolean> => {
  const hash = await readOTPHash(mail);
  const hashedOTP = hashOTP(otp);
  return hashedOTP === hash;
};
