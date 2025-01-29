import React, { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);

      if (Object.keys(newEmail).length === 0)
        return setError("No change made!");

      if (!newEmail) {
        return setError("Email required!");
      }

      const res = await fetch(`/api/auth/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setError(null);
        setLoading(false);
        setNewEmail(e.target.reset());
        toast.success(data.message);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      // toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-inherit shadow-md border border-bgDark/20 rounded-sm w-[350px] sm:w-96 ">
        <div className="p-8 flex flex-col gap-3">
          <Title text1={"Forgot"} text2={"Password"} />

          <p className="text-xs font-light">
            You can reset your account password by email.
          </p>

          <div className="">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm cursor-pointer w-fit">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your email address"
                  className="border border-borderColor outline-borderColorHover rounded-sm w-full p-2 text-sm bg-inherit"
                  onChange={(e) => setNewEmail(e.target.value)}
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
                disabled={loading}
                type={"submit"}
                text={loading ? "Loading..." : "Reset"}
                className={`text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%] mt-3`}
              />

              {/* error */}
              {error && (
                <p className="text-red-500 text-xs">{error || error.message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
