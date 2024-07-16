"use client";

import React, {
  type KeyboardEvent,
  type ChangeEvent,
  type ClipboardEvent,
  type FC,
  useRef,
  useState,
} from "react";

const SignupEmailVerify: FC = () => {
  const [code, setCode] = useState<string[]>(Array(8).fill(""));

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const emailId = "roc8-ecommerce@gmail.com";

  function handleInputChange(e: HTMLInputElement, index: number) {
    const { value } = e;
    if (/^[0-9]$/.test(value)) {
      setCode((prevValue) => {
        const newVal = [...prevValue];
        newVal[index] = value;
        console.log("new value =", newVal);
        return newVal;
      });
      if (index < 7) {
        inputRef.current[index + 1]?.focus();
      }
    } else if (!/^[0-9]$/.test(value) && value === "") {
    } else {
      alert("Only numbers are allowed.");
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const pasteStr = event.clipboardData.getData("text");
    // const pasteArray = paste.split("");
    const newCode = [...code];
    const loopLength = Math.min(8, pasteStr.length);

    for (let i = 0; i < loopLength; i++) {
      if (pasteStr[i] !== undefined && /^[0-9]$/.test(pasteStr[i] ?? "")) {
        newCode[i] = pasteStr[i] ?? "";
      }
    }
    setCode(newCode);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (event.key === "Backspace") {
      if (index >= 0) {
        inputRef.current[index === 0 ? 0 : index - 1]?.focus();
        console.log("index =", index);
        setCode((prevVal) => {
          const newVal = [...prevVal];
          newVal[index] = "";
          console.log("new value array =", newVal);
          return newVal;
        });
      }
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="my-6 rounded-lg border border-slate-200 px-10 py-6">
        <h2 className="my-5 text-center text-3xl font-semibold">
          Verify your email
        </h2>
        <p className="mx-auto w-3/4 text-center text-sm">
          Enter the 8 digit code you have received on{" "}
          {emailId.split("@").map((el, eli) => {
            return (
              <span key={eli}>
                {eli === 0 ? el.slice(0, 3) + "***" : "@" + el}
              </span>
            );
          })}
        </p>

        <p className="mt-5 text-sm">Code</p>
        <div
          className="mb-5 flex items-center justify-center gap-3"
          onPaste={handlePaste}
        >
          {code.map((el, eli) => {
            return (
              <input
                key={eli}
                name={`${eli}`}
                value={el ?? ""}
                type="text"
                className="h-10 w-10 rounded-md border border-slate-200 text-center"
                maxLength={1}
                ref={(e) => {
                  inputRef.current[eli] = e;
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target, eli)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e, eli)
                }
              />
            );
          })}
        </div>
        <div className="loginDiv">
          <button className="my-6 w-full rounded bg-black py-2 font-semibold text-white">
            VERIFY
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupEmailVerify;
