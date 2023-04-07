import { Mailchain } from "@mailchain/sdk";

const sendMailchain = async () => {
  const mailchain = Mailchain.fromSecretRecoveryPhrase(
    process.env.NEXT_PUBLIC_MAILCHAIN_SECRET_RECOVERY_PHRASE!
  );
};
