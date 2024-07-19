"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent } from "react";

import { api } from "~/trpc/react";

interface UserData {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
}
type SignupFormProps = {
  handleVerifyEmail: () => void;
  userData: UserData;
  setUserData: (e: UserData | ((prevVal: UserData) => UserData)) => void;
};

export default function SignupForm({
  handleVerifyEmail,
  userData,
  setUserData,
}: SignupFormProps) {
  const router = useRouter();
  const createUserMutation = api.user.create.useMutation({
    onSuccess: (data) => {
      console.log("User created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  async function handleCreateNewUser() {
    return createUserMutation.mutate(userData);
  }

  function handleTypeValidateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function handleChangeUserValue(e: ChangeEvent<HTMLInputElement>) {
    const name: string = e.target.name;
    setUserData((prevVal: UserData) => {
      return { ...prevVal, [name]: e.target.value };
    });
  }

  function handleRouter(path: string) {
    const route = "/" + path;
    router.push(route);
  }

  async function handleCreateUser() {
    const emailTypeVerified = handleTypeValidateEmail(userData.email);
    if (emailTypeVerified) {
      await handleCreateNewUser();
      handleVerifyEmail();
    } else {
      alert("Enter valid email.");
    }
  }
  return (
    <div className="flex w-full items-center justify-center bg-white">
      <div className="my-8 min-h-[460px] w-[432px] rounded-2xl border border-slate-200 px-8 pb-10 pt-8">
        <p className="text-center text-3xl font-bold">Create your account</p>

        <div className="nameDiv my-4 text-left">
          <label className="text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChangeUserValue}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
            placeholder="Enter"
          />
        </div>
        <div className="emailDiv my-4 text-left">
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChangeUserValue}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
            placeholder="Enter"
          />
        </div>
        <div className="passwordDiv relative my-3 text-left">
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChangeUserValue}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
            placeholder="Enter"
          />
          <span className="absolute right-4 top-2/4 cursor-pointer text-sm underline"></span>
        </div>
        <div className="loginDiv">
          <button
            className="my-6 w-full rounded bg-black py-2 font-semibold text-white"
            onClick={() => handleCreateUser()}
          >
            CREATE ACCOUNT
          </button>
        </div>
        <div className="signupSpanDiv">
          <p className="my-3 text-center text-xs">
            <span className="mr-3">Have an Account?</span>
            <span
              className="cursor-pointer font-bold"
              onClick={() => handleRouter("")}
            >
              LOGIN
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
