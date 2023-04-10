import crypto from "crypto";
import { redisConnect } from "./redisClient";

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
  if (redisConnect.status === "ready") {
    await redisConnect.set(`otpHash:${mail}`, hash, "EX", 60 * 5);
  } else {
    await redisConnect.connect();
    await redisConnect.set(`otpHash:${mail}`, hash, "EX", 60 * 5);
  }
};

export const readOTPHash = async (mail: string): Promise<string | null> => {
  let response: string | null = null;

  redisConnect.on("ready", async () => {
    response = await redisConnect.get(`otpHash:${mail}`);
  });

  redisConnect.on("connect", async () => {});

  redisConnect.on("error", (err) => {
    console.log(err);
  });

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
