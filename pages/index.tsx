import { Login, OTP, Signup } from "@/components";
import { useState } from "react";

export default function Home() {
  const [mailchainAddr, setMailchainAddr] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [isSignup, setIsSignup] = useState<boolean>(false);

  return (
    <div className="flex h-screen justify-center items-center">
      {!isSignup ? (
        <Signup setMailchainAddr={setMailchainAddr} setIsSignup={setIsSignup} />
      ) : (
        <OTP
          mail={mailchainAddr}
          verified={verified}
          setVerified={setVerified}
        />
      )}

      {/* <Login onLogin={} /> */}
    </div>
  );
}
