import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Title from "../../components/Title";
import Button from "../../components/Button";
import {
  updateUserPasswordStart,
  updateUserPasswordSuccess,
  updateUserPasswordFailure,
} from "../../redux/user/userSlice";
import toast from "react-hot-toast";

const DashPasswordChange = () => {
  const dispatch = useDispatch();
  const { error, loading, currentUser } = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");

  const handleUpdateUserPassword = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(newPassword).length === 0)
        return dispatch(updateUserFailure("No change made!"));

      if (!oldPassword || !newPassword || !confNewPassword) {
        dispatch(updateUserPasswordFailure("All filds required!"));
        return;
      }

      if (newPassword !== confNewPassword) {
        dispatch(
          updateUserPasswordFailure("New and confirm password not matched!")
        );
        return;
      }

      dispatch(updateUserPasswordStart());
      const res = await fetch(
        `/api/user/updateUserPassword/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserPasswordFailure(data.message));
        return;
      }
      if (res.ok) {
        dispatch(updateUserPasswordSuccess(data));
        toast.success(data.message);
        // navigate("/sign-in");
      }
    } catch (error) {
      dispatch(updateUserPasswordFailure(error.message));
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
              onSubmit={handleUpdateUserPassword}
            >
              <input
                type="password"
                className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                placeholder="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />

              <input
                type="password"
                className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <input
                type="password"
                className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                placeholder="Confirm New Password"
                onChange={(e) => setConfNewPassword(e.target.value)}
                required
              />

              <div className="w-full flex items-center justify-center gap-2 -mt-2">
                <Link to={"/dashboard?tab=profile"}>
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

export default DashPasswordChange;
