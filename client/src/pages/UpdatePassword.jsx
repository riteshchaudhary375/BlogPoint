import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import Button from "../components/Button.jsx";
import {
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
} from "../redux/user/userSlice.js";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { error, loading, currentUser } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(newPassword).length === 0)
        return dispatch(updateUserFailure("No change made!"));

      if (!oldPassword || !newPassword || !confNewPassword) {
        dispatch(updatePasswordFailure("All fields required!"));
        return;
      }

      if (newPassword !== confNewPassword) {
        dispatch(
          updatePasswordFailure("New and confirm password not matched!")
        );
        return;
      }

      dispatch(updatePasswordStart());
      const res = await fetch(`/api/user/updatePassword/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updatePasswordFailure(data.message));
        return;
      }
      if (res.ok) {
        dispatch(updatePasswordSuccess(data));
        toast.success(data.message);
        // navigate("/sign-in");
      }
    } catch (error) {
      dispatch(updatePasswordFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="pt-2 sm:pt-6 md:pt-8">
        <div className="flex items-center justify-center">
          <div className="w-[380px] py-10 px-6 border border-borderColor rounded-sm flex flex-col">
            <div className="text-center mb-6">
              <Title text1={"Update"} text2={"Password"} />
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleUpdatePassword}
            >
              {/* Old Password */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="oldPassword"
                  className="text-sm cursor-pointer w-fit"
                >
                  Old Password
                </label>
                <div className="relative flex items-center bg-inherit w-full border border-borderColor outline-borderColorHover rounded-sm">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    id="oldPassword"
                    placeholder="your old password"
                    required
                    className="w-full p-2 text-sm bg-inherit"
                    onChange={(e) => setOldPassword(e.target.value)}
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
                    type={showPassword2 ? "text" : "password"}
                    id="newPassword"
                    placeholder="your new password"
                    required
                    className="w-full p-2 text-sm bg-inherit"
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    type={showPassword3 ? "text" : "password"}
                    id="confPassword"
                    placeholder="confirm new password"
                    required
                    className="w-full p-2 text-sm bg-inherit"
                    onChange={(e) => setConfNewPassword(e.target.value)}
                  />
                  {!showPassword3 ? (
                    <img
                      src={assets.eye}
                      alt="icon"
                      className="absolute w-5 h-5 object-cover object-center cursor-pointer right-2"
                      onClick={() => setShowPassword3((prev) => !prev)}
                    />
                  ) : (
                    <img
                      src={assets.eye_closed}
                      alt="icon"
                      className="absolute w-5 h-5 object-cover object-center cursor-pointer right-2"
                      onClick={() => setShowPassword3((prev) => !prev)}
                    />
                  )}
                </div>
              </div>

              <div className="w-full flex items-center justify-center gap-2 -mt-2">
                <Link to={"/profile"}>
                  <Button
                    disabled={loading}
                    type={"button"}
                    text={"Cancel"}
                    className={`w-fit border border-bgDark hover:bg-lightBgHover mt-6 ${
                      loading && "opacity-90"
                    } font-light text-textColor3 border-borderColor hover:border-red-500 hover:text-red-500 text-sm`}
                  />
                </Link>
                <Button
                  disabled={loading}
                  type={"submit"}
                  text={loading ? "Saving..." : "Save"}
                  className={`w-fit border border-bgDark hover:bg-lightBgHover mt-6 ${
                    loading && "opacity-90"
                  } font-light text-textColor3 border-borderColor hover:border-borderColorHover hover:text-textColor2 text-sm`}
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

export default UpdatePassword;
