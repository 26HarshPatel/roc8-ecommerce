"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  function handleRouter(path: string) {
    const route = "/" + path;
    router.push(route);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex w-full items-center justify-center bg-white">
      <div className="my-8 h-[460px] w-[432px] rounded-2xl border border-slate-200 px-8 py-5">
        <p className="text-center text-3xl font-bold">Login</p>
        <p className="mt-5 text-center font-semibold">
          Welcome back to ECOMMERCE
        </p>
        <p className="mt-2 text-center text-sm">
          The next gen business marketplace
        </p>
        <div className="emailDiv mb-4 mt-8 text-left">
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
            placeholder="Enter"
          />
        </div>
        <div className="passwordDiv relative my-3 text-left">
          <label className="text-sm font-semibold">Password</label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
            placeholder="Enter"
          />
          <span
            className="absolute right-4 top-2/4 cursor-pointer text-sm underline"
            onClick={handleShowPassword}
          >
            {`${showPassword ? "hide" : "show"}`}
          </span>
        </div>
        <div className="loginDiv">
          <button className="my-6 w-full rounded bg-black py-2 font-semibold text-white">
            LOGIN
          </button>
        </div>
        <hr />
        <div className="signupSpanDiv">
          <p className="my-3 text-center text-xs">
            <span className="mr-3">{`Don't have an Account?`}</span>
            <span
              className="cursor-pointer font-bold"
              onClick={() => handleRouter("signup")}
            >
              SIGN UP
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
