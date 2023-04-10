import { verifyOTP } from "@/utils/otpUtils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { otp, mail } = req.body;

  const result = await verifyOTP(mail, Number(otp));

  res.status(200).json({ result });
}
