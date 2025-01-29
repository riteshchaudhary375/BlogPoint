import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import Button from "../components/Button.jsx";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   fetch user for verification for rest password
  const userValid = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/auth/reset-password/${userId}/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(data.message);
        toast.error("User not valid!");
        navigate("/page-not-found");
        return;
      }
      if (res.ok) {
        setLoading(false);
        setError(null);
        toast.success("User valid");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  //   Submit new password
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.keys(newPassword).length === 0 &&
      Object.keys(confNewPassword).length === 0
    )
      return setError("No change made!");

    if (!newPassword || newPassword === "") {
      return setError("New password is required!");
    }

    if (!confNewPassword || confNewPassword === "") {
      return setError("Confirm password is required!");
    }

    if (newPassword !== confNewPassword) {
      return setError("Password and Confirm password not matched");
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/auth/${userId}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(data.message);
        // toast.error(data.message);
        return;
      }
      if (res.ok) {
        setLoading(false);
        setError(null);
        toast.success(data.message);
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      // toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-inherit shadow-md border border-bgDark/20 rounded-sm w-[350px] sm:w-96 ">
        <div className="p-8 flex flex-col gap-3">
          <Title text1={"Reset"} text2={"Password"} />

          <p className="text-xs font-light">
            Create new password for your account.
          </p>

          <div className="">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* New Password */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="newPassword"
                  className="text-sm cursor-pointer w-fit"
                >
                  New Password
                </label>
                <div className="relative flex items-center bg-inherit w-full border border-borderColor outline-borderColorHover rounded-sm">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    id="newPassword"
                    placeholder="your new password"
                    required
                    className="w-full p-2 text-sm bg-inherit"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {!showPassword1 ? (
                    <img
                      src={assets.eye}
                      alt="icon"
                      className="absolute w-5 h-5 object-cover object-center cursor-pointer right-2"
                      onClick={() => setShowPassword1((prev) => !prev)}
                    />
                  ) : (
                    <img
                      src={assets.eye_closed}
                      alt="icon"
                      className="absolute w-5 h-5 object-cover object-center cursor-pointer right-2"
                      onClick={() => setShowPassword1((prev) => !prev)}
                    />
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="confPassword"
                  className="text-sm cursor-pointer w-fit"
                >
                  Confirm Password
                </label>
                <div className="relative flex items-center bg-inherit w-full border border-borderColor outline-borderColorHover rounded-sm">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    id="confPassword"
                    placeholder="confirm new password"
                    required
                    className="w-full p-2 text-sm bg-inherit"
                    onChange={(e) => setConfNewPassword(e.target.value)}
                  />
                  {!showPassword2 ? (
                    <img
                      src={assets.eye}
                      alt="icon"
                      className="absolute w-5 h-5 object-cover object-center cursor-pointer right-2"
                      onClick={() => setShowPassword2((prev) => !prev)}
                    />
                  ) : (
                    <img
                      src={assets.eye_closed}
                      alt="icon"
                      className="absolute w-5 h-5 object-cover object-center cursor-pointer right-2"
                      onClick={() => setShowPassword2((prev) => !prev)}
                    />
                  )}
                </div>
              </div>

              {/* Create account and sign-in */}
              <div className="flex items-center justify-between text-sm -mt-1">
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

              <div className="text-center mt-2">
                <Button
                  disabled={loading}
                  type={"submit"}
                  text={loading ? "Loading..." : "Submit"}
                  className={
                    "text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%]"
                  }
                />
              </div>

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

export default ResetPassword;
