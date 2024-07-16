"use client";

import { useState } from "react";
import SignupForm from "../_components/signupForm";
import SignupEmailVerify from "../_components/emailVerify";

export default function Signup() {
  const [verifyEmail, setVerifyEmail] = useState(false);

  function handleVerifyEmail(): void {
    setVerifyEmail(!verifyEmail);
  }
  return (
    <div className="">
      {verifyEmail ? (
        <SignupEmailVerify />
      ) : (
        <SignupForm handleVerifyEmail={handleVerifyEmail} />
      )}
    </div>
  );
}
