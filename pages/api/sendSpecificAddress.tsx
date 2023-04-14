import { sendMailchainSpecificAddress } from "@/utils/mailchainUtils";
import { SentMail } from "@mailchain/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: any;
  error?: string;
};

/**
 * This is an async function that handles a request and sends an email to a specific address using
 * Mailchain.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const params = req.body;

    const { data, error } = await sendMailchainSpecificAddress(params.to);

    if (error) {
      throw new Error("Mailchain error: " + error.message);
    }

    res.status(200).send({ data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    }
  }
}
