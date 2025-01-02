import React from "react";
import { useNavigate } from "react-router-dom";

import Title from "../components/Title";
import Button from "../components/Button";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    // <div className="min-h-screen pt-8">
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-inherit shadow-md border border-bgDark/20 rounded-sm w-[350px] sm:w-96 ">
        <div className="p-8 flex flex-col gap-3">
          <Title text1={"Sign"} text2={"In"} />

          <p className="text-xs font-light">
            You can log in with your email and password or with Google.
          </p>

          <div className="">
            <form className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@email.com"
                  required
                  className="border border-bgDark/30 rounded-sm w-full p-2 outline-bgDark/50 text-sm bg-inherit"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm">
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="⁎⁎⁎⁎⁎⁎⁎"
                  required
                  className="border border-bgDark/30 rounded-sm w-full p-2 outline-bgDark/50 text-sm bg-inherit"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <p className="cursor-pointer hover:underline">
                  Forgot password?
                </p>
                <p
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate("/sign-up")}
                >
                  Create account
                </p>
              </div>

              <Button
                type={"button"}
                text={"Login"}
                className={
                  "text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%] mt-3"
                }
                handleClick={() => alert("Processing...")}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
