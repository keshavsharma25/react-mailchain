# React-Email for Mailchain

Welcome to this tutorial on creating email templates for Mailchain using React-Email. Mailchain is a decentralized messaging protocol that allows users to send and receive messages across different web3 identities. React-Email is a popular library that makes it easy to create and send custom HTML email templates.
Link to the blog for reference: [Using React-Email to create templates for Mailchain](https://0xkeshav.hashnode.dev/using-react-email-to-create-templates-for-mailchain)

## Prerequisites

To run this project, you need to have the following:

- A Mailchain account and supported wallet or protocol addresses
- Redis Database (you can create a free account from [Upstash](https://upstash.com))

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository on your local machine:

   ```bash
   git clone https://github.com/keshavsharma25/react-mailchain
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Add the environment variables:

   ```bash
   cp .env.example .env
   ```

   ```yaml
   NEXT_PUBLIC_SECRET_RECOVERY_PHRASE= # retrieve from mailchain settings
   NEXT_PUBLIC_PRIVATE_MESSAGING_KEY= # retrieve from mailchain settings
   NEXT_PUBLIC_SENDER_ADDRESS= # Your Mailchain address
   NEXT_PUBLIC_REDIS_URL= # Redis URL
   ```

4. Run the project:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open the project in your browser:

   ```bash
   http://localhost:3000
   ```

## Important Details to Remember

- Mailchain requires either a Secret Recovery Phrase or a Private Messaging Key to send emails to other Web3 identities that it supports. Store your secret recovery phrase or private messaging key securely to prevent unauthorized access.
- If you suspect that your private messaging key has been compromised, re-register your wallet or protocol address to generate a new private messaging key.
- Deploying the app on Vercel might generate a gateway timeout error as it takes more than 5 seconds for Mailchain-SDK to respond to requests and Vercel has a timeout of 5 seconds for the free tier.

## Conclusion

We hope you find this project helpful in improving your email communication with Mailchain. If you have any questions or suggestions, feel free to reach out to us on [Twitter](https://twitter.com/skeshav25). Don't forget to give this project a star if you found it useful!
