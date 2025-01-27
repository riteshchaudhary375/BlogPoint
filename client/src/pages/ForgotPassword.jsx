import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Title from "../components/Title";

const ForgotPassword = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-inherit shadow-md border border-bgDark/20 rounded-sm w-[350px] sm:w-96 ">
        <div className="p-8 flex flex-col gap-3">
          <Title text1={"Reset"} text2={"Password"} />

          <p className="text-xs font-light">
            You can reset your account by email.
          </p>

          <div className="">
            <form className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm cursor-pointer w-fit">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your email address"
                  className="border border-borderColor outline-borderColorHover rounded-sm w-full p-2 text-sm bg-inherit"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  to={"/sign-up"}
                  className="cursor-pointer hover:underline"
                >
                  Create account
                </Link>

                <Link
                  to={"/sign-in"}
                  className="cursor-pointer hover:underline"
                >
                  Sign in
                </Link>
              </div>

              <Button
                type={"submit"}
                text={"Reset"}
                className={`text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%] mt-3`}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
