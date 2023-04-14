import { Mailchain } from "@mailchain/sdk";
import {
  MailSender,
  privateMessagingKeyFromHex,
} from "@mailchain/sdk/internal";
import { generateSecureOTP, hashOTP, storeOTPHash } from "./otpUtils";
import { renderVerifyOTP } from "./renderVerifyOTP";

/**
 * This function sends an email containing a verification code to a specified mailchain address using
 * Mailchain-sdk and stores a hashed version of the code.
 * @param {string} to - The email address of the recipient to whom the verification code will be sent.
 * @returns An object with two properties: "data" and "error".
 */
export const sendMailchainSimple = async (to: string) => {
  const secretRecoveryPhrase = process.env.NEXT_PUBLIC_SECRET_RECOVERY_PHRASE!;

  if (secretRecoveryPhrase == undefined) {
    throw new Error("You must provide a secret recovery phrase in .env");
  }
  const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

  const fromAddress = await mailchain.user();

  const code = generateSecureOTP();
  const emailHtml = renderVerifyOTP(Number(code));

  const { data, error } = await mailchain.sendMail({
    from: fromAddress.address,
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

/**
 * This function sends an email containing a verification code to a specific address and stores a
 * hashed version of the code.
 * @param {string} toAddress - The email address of the recipient to whom the verification code will be
 * sent.
 * @returns An object with two properties: "data" and "error".
 */
export const sendMailchainSpecificAddress = async (toAddress: string) => {
  const pvtMsgKeyHex = process.env.NEXT_PUBLIC_PRIVATE_MESSAGING_KEY!;

  if (pvtMsgKeyHex === undefined) {
    throw new Error("You must provide a private messaging key in .env");
  }

  const privateMessagingKey = privateMessagingKeyFromHex(pvtMsgKeyHex);

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
