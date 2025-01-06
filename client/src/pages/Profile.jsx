import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Title from "../components/Title";
// import { assets } from "../assets/assets";
import Button from "../components/Button";
import HorizontalLine from "../components/HorizontalLine";
import Title2 from "../components/Title2";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice.js";

const Profile = () => {
  const { error, loading, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `/api/user/updateUserProfile/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setIsEdit(false);
        dispatch(updateUserFailure(data.message));
        return;
      }
      if (res.ok) {
        setIsEdit(false);
        dispatch(updateUserSuccess(data));
        toast.success("Profile updated");
      }
    } catch (error) {
      // console.log(error);
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="pt-2 sm:pt-6 md:pt-8">
      <div className="w-full sm:w-2/3 md:w-3/5 lg:w-2/5">
        <div className="w-full sm:w-fit">
          <Title text1={"My"} text2={"Profile"} />
        </div>

        <div className="my-8 sm:my-12 md:my-14">
          <div className="flex flex-col gap-8">
            <img
              src={currentUser.profilePicture}
              alt="Profile picture"
              className="w-36 rounded-sm"
            />

            <div className="flex flex-col gap-1">
              {isEdit ? (
                <input
                  type="text"
                  id="username"
                  className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm text-3xl px-2 py-1"
                  placeholder="full name"
                  onChange={handleChange}
                  defaultValue={currentUser.username}
                />
              ) : (
                <p className="text-3xl text-textColor1">
                  {currentUser.username}
                </p>
              )}
              <HorizontalLine />
            </div>
            {/* <form className="flex flex-col gap-4">
            <div className="w-32 h-32 cursor-pointer shadow-sm overflow-hidden rounded-sm">
              <img
                src={currentUser.profilePicture}
                alt="profile picture"
                className="w-full h-full rounded-sm object-cover border-6 border-[lightgray]"
              />
            </div>

            <input
              type="text"
              id="username"
              defaultValue={currentUser.username}
              placeholder="username"
              onChange={handleChange}
              className="bg-inherit border border-borderColor outline-borderColorHover px-2 py-1 rounded-sm"
            />

            <input
              type="email"
              id="email"
              defaultValue={currentUser.email}
              placeholder="email"
              onChange={handleChange}
              className="bg-inherit border border-borderColor outline-borderColorHover px-2 py-1 rounded-sm"
            />

            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              className="bg-inherit border border-borderColor outline-borderColorHover px-2 py-1 rounded-sm"
            />

            <Button
              type={"submit"}
              text={"Update"}
              className={"border border-bgDark hover:bg-lightBgHover"}
              handleClick={() => alert("Processing...")}
            />
          </form> */}

            {/* Contact */}
            <div>
              <div className="-mb-2.5">
                <Title2 text1={"Contact Information"} />
              </div>
              <div className="grid grid-cols-[1.5fr_3fr] gap-y-2.5 text-textColor3">
                <p className="font-medium text-textColor1">Email Id:</p>
                <p>{currentUser.email}</p>

                <p className="font-medium text-textColor1">Phone:</p>
                {isEdit ? (
                  <input
                    type="text"
                    id="phone"
                    className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                    placeholder="phone no"
                    onChange={handleChange}
                    defaultValue={currentUser.phone}
                  />
                ) : (
                  <p>{currentUser.phone}</p>
                )}

                <p className="font-medium text-textColor1">Address:</p>
                {isEdit ? (
                  <p className="flex flex-col gap-1">
                    <input
                      type="text"
                      id="phone"
                      className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                      placeholder="address 1"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      defaultValue={currentUser.address.line1}
                      // value={currentUser.address.line1}
                    />
                    <input
                      type="text"
                      id="phone"
                      className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                      placeholder="address 2"
                      // onChange={handleChange}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      defaultValue={currentUser.address.line2}
                      // value={currentUser.address.line2}
                    />
                  </p>
                ) : (
                  <p>
                    {currentUser.address.line1}
                    <br />
                    {currentUser.address.line2}
                  </p>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <div className="-mb-2.5">
                <Title2 text1={"Basic Information"} />
              </div>
              <div className="grid grid-cols-[1.5fr_3fr] gap-y-2.5 text-textColor2">
                <p className="font-medium text-textColor1">Gender:</p>
                {isEdit ? (
                  <select
                    id="gender"
                    className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                    onChange={handleChange}
                    defaultValue={currentUser.gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p>{currentUser.gender}</p>
                )}

                <p className="font-medium text-textColor1">Date Of Birth:</p>
                {isEdit ? (
                  <input
                    type="date"
                    id="dob"
                    className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                    placeholder="date of birth"
                    onChange={handleChange}
                    defaultValue={currentUser.dob}
                  />
                ) : (
                  <p>{currentUser.dob}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start">
              {isEdit ? (
                <Button
                  disabled={loading}
                  type={"button"}
                  text={loading ? "Saving..." : "Save Profile"}
                  className={`w-fit border border-bgDark hover:bg-lightBgHover mt-6 ${
                    loading && "opacity-90"
                  }`}
                  handleClick={handleUpdateProfile}
                />
              ) : (
                <Button
                  disabled={loading}
                  type={"button"}
                  text={"Edit Profile"}
                  className={`w-fit border border-bgDark hover:bg-lightBgHover mt-6 ${
                    loading && "opacity-90"
                  }`}
                  handleClick={() => setIsEdit(true)}
                />
              )}
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-xs -mt-4">
                {error || error.message}
              </p>
            )}
            {/* <p className="bg-red-400 -mt-4">error</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
