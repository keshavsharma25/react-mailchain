import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerifyOTPProps {
  validationCode?: string;
}

const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "";

export const VerifyOTP = ({ validationCode }: VerifyOTPProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="font-sans bg-gray-50">
        <Container className="bg-white border border-gray-200 rounded-lg shadow-md mt-8 mx-auto p-8">
          <div className="flex flex-col items-center">
            <Img
              src={`${baseURL}/logo.png`}
              width={88}
              height={88}
              alt=""
              className="my-4 "
            />
            <Text className="text-blue-500 text-xs font-bold tracking-wide uppercase mb-2">
              Verify Your Identity
            </Text>
            <Heading className="text-gray-800 text-2xl font-medium text-center mb-4">
              Enter the following code to verify your identity.
            </Heading>
          </div>
          <Section className="bg-gray-100 rounded-md px-4 py-6 flex items-center justify-center mb-6">
            <Text className="text-4xl font-bold text-gray-800 tracking-wide">
              {validationCode}
            </Text>
          </Section>
          <Text className="text-gray-600 text-base font-normal leading-6 text-center">
            If you did not request this code, please disregard this message.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
