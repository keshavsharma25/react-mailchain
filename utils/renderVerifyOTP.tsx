import { render } from "@react-email/render";
import { VerifyOTP } from "../emails/VerifyOTP";

export const renderVerifyOTP = (otp: string) => {
  const html = render(<VerifyOTP validationCode={otp} />, {
    pretty: true,
  });

  return html;
};
