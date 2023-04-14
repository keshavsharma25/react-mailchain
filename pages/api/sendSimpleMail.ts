import { sendMailchainSimple } from "@/utils/mailchainUtils";
import { SentMail } from "@mailchain/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: SentMail | undefined;
  error?: string;
};

/**
 * This is an async function that handles a Next.js API request to send a simple email using Mailchain
 * and returns a response with the result or an error message.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const params = req.body;

    const { data, error } = await sendMailchainSimple(params.to);

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
