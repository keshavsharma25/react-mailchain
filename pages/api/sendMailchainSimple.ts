import { generateSecureOTP, hashOTP, storeOTPHash } from "@/utils/otpUtils";
import { Mailchain, SentMail } from "@mailchain/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { renderVerifyOTP } from "../../utils/renderVerifyOTP";

type Data = {
  data: SentMail;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = req.body;

  const secretRecoveryPhrase = process.env.NEXT_PUBLIC_SECRET_RECOVERY_PHRASE;

  if (secretRecoveryPhrase == null) {
    throw new Error("You must provide a secret recovery phrase");
  }
  const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

  const serverAddress = await mailchain.user();

  const code = Number(generateSecureOTP());
  const emailHtml = renderVerifyOTP(code.toString());

  const { data, error } = await mailchain.sendMail({
    from: serverAddress.address,
    to: [params.to],
    subject: `Your verification code for SwiftSignup registration: ${code}`,
    content: {
      text: `Your verification code for SwiftSignup registration: ${code}`,
      html: emailHtml,
    },
  });

  if (error) {
    throw new Error("Mailchain error: " + error.message);
  }

  await storeOTPHash(params.to, hashOTP(code));
  res.status(200).send({ data });
}
