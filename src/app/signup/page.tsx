"use client";

import { useState } from "react";
import SignupForm from "../_components/signupForm";
import SignupEmailVerify from "../_components/emailVerify";

export default function Signup() {
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    isEmailVerified: false,
  });

  function handleVerifyEmail(): void {
    setVerifyEmail(!verifyEmail);
  }
  return (
    <div className="">
      {verifyEmail ? (
        <SignupEmailVerify emailId={userData.email} />
      ) : (
        <SignupForm
          handleVerifyEmail={handleVerifyEmail}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </div>
  );
}
