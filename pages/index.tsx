import { OTP, Signin } from "@/components";
import { useState } from "react";

export default function Home() {
  const [mailchainAddr, setMailchainAddr] = useState<string>("");
  const [verified, setVerified] = useState<boolean | null>(null);
  const [isSignin, setIsSignin] = useState<boolean>(false);

  return (
    <div className="flex h-screen justify-center items-center">
      {!isSignin ? (
        <Signin setMailchainAddr={setMailchainAddr} setIsSignin={setIsSignin} />
      ) : (
        <OTP
          mail={mailchainAddr}
          verified={verified}
          setVerified={setVerified}
        />
      )}
    </div>
  );
}
