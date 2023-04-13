import { Mailchain } from "@mailchain/sdk";
import {
  MailSender,
  privateMessagingKeyFromHex,
} from "@mailchain/sdk/internal";
import { generateSecureOTP, hashOTP, storeOTPHash } from "./otpUtils";
import { renderVerifyOTP } from "./renderVerifyOTP";

export const sendMailchainSimple = async (to: string) => {
  const secretRecoveryPhrase = process.env.NEXT_PUBLIC_SECRET_RECOVERY_PHRASE;

  if (secretRecoveryPhrase == null) {
    throw new Error("You must provide a secret recovery phrase");
  }
  const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

  const serverAddress = await mailchain.user();

  const code = generateSecureOTP();
  const emailHtml = renderVerifyOTP(Number(code));

  const { data, error } = await mailchain.sendMail({
    from: serverAddress.address,
    to: [to],
    subject: `Your verification code for SwiftSignup registration: ${code}`,
    content: {
      text: `Your verification code for SwiftSignup registration: ${code}`,
      html: emailHtml,
    },
  });

  await storeOTPHash(to, hashOTP(Number(code)));

  return { data, error };
};

export const sendMailchainSpecificAddress = async (toAddress: string) => {
  const privateMessagingKey = privateMessagingKeyFromHex(
    process.env.NEXT_PUBLIC_PRIVATE_MESSAGING_KEY!
  );

  if (privateMessagingKey === undefined) {
    throw new Error("You must provide a private messaging key in .env");
  }

  const mailSender = MailSender.fromSenderMessagingKey(privateMessagingKey);

  const fromAddress = process.env.NEXT_PUBLIC_SENDER_ADDRESS!;

  const code = generateSecureOTP();
  const emailHtml = renderVerifyOTP(Number(code));

  const { data, error } = await mailSender.sendMail({
    from: fromAddress,
    to: [toAddress],
    subject: `Your verification code for SwiftSignup registration: ${code}`,
    content: {
      text: `Your verification code for SwiftSignup registration: ${code}`,
      html: emailHtml,
    },
  });

  await storeOTPHash(toAddress, hashOTP(Number(code)));

  return { data, error };
};
