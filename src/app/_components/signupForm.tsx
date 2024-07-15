"use client";

import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  function handleRouter(path: string) {
    const route = "/" + path;
    router.push(route);
  }
  return (
    <div className="flex w-full items-center justify-center bg-white">
      <div className="my-8 min-h-[460px] w-[432px] rounded-2xl border border-slate-200 px-8 pb-16 pt-8">
        <p className="text-center text-3xl font-bold">Create your account</p>

        <div className="nameDiv my-4 text-left">
          <label className="text-sm font-semibold">Name</label>
          <input
            type="text"
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
            placeholder="Enter"
          />
        </div>
        <div className="emailDiv my-4 text-left">
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
            type="password"
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm"
            placeholder="Enter"
          />
          <span className="absolute right-4 top-2/4 cursor-pointer text-sm underline"></span>
        </div>
        <div className="loginDiv">
          <button className="my-6 w-full rounded bg-black py-2 font-semibold text-white">
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
