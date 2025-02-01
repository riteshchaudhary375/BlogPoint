import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// import { assets } from "../assets/assets";
import Title from "../components/Title";
import Button from "../components/Button";
import Badge from "../components/Badge.jsx";
import HorizontalLine from "../components/HorizontalLine";
import Title2 from "../components/Title2";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updateUserProfileImageStart,
  updateUserProfileImageSuccess,
  updateUserProfileImageFailure,
} from "../redux/user/userSlice.js";

const Profile = () => {
  const { error, loading, currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const filePickerRef = useRef();

  const [subscribedData, setSubscribedData] = useState({});
  // console.log("subscribedData: ", subscribedData);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateProfileData = async (e) => {
    try {
      if (Object.keys(formData).length === 0)
        return dispatch(updateUserFailure("No change made!"));

      dispatch(updateUserStart());

      const res = await fetch(
        `/api/user/updateUserProfileData/${currentUser._id}`,
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
        toast.success("Profile data updated");
      }
    } catch (error) {
      // console.log(error);
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleChangeProfieImage = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserProfileImageStart());

      const imageData = new FormData();
      image && imageData.append("image", image);

      const res = await fetch(
        `/api/user/updateUserProfileImage/${currentUser._id}`,
        {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          body: imageData,
        }
      );
      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        dispatch(updateUserProfileImageFailure(data.message));
        setIsEditProfile(false);
        toast.error(data.message);
        // console.log(data.message);
        return;
      }
      if (res.ok) {
        dispatch(updateUserProfileImageSuccess(data.rest));
        setIsEditProfile(false);
        toast.success(data.message);
        // console.log(data);
      }
    } catch (error) {
      dispatch(updateUserProfileImageFailure(error.message));
      setIsEditProfile(false);
      toast.error(error.message);
      // console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchSubscribePlanData = async () => {
      try {
        const res = await fetch(
          `/api/subscriptionPackage/getPlan/${currentUser._id}`
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          toast.error(data.message);
          return;
        }
        if (res.ok) {
          // if (data.subscribedData[0].userId === currentUser._id) {
          if (data.subscribedData[0].userId === currentUser._id) {
            setSubscribedData(data.subscribedData[0]);
            setIsSubscribed(true);
          }
        }
      } catch (error) {
        // console.log(error);
        // toast.error(error.message);
      }
    };
    fetchSubscribePlanData();
  }, [currentUser._id]);

  return (
    currentUser && (
      <div className="container pt-2 sm:pt-6 md:pt-8">
        <div className="w-full sm:w-2/3 md:w-3/5 lg:w-2/5">
          <div className="w-full sm:w-fit">
            <Title text1={"My"} text2={"Profile"} />
          </div>

          <div className="my-8 sm:my-12 md:my-14">
            <div className="flex flex-col gap-8">
              {isEditProfile ? (
                <form onSubmit={handleChangeProfieImage}>
                  <label htmlFor="image">
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        ref={filePickerRef}
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                        hidden
                      />
                      <div className=" flex flex-col gap-1">
                        <div className="w-36 h-fit cursor-pointer rounded-sm shadow-sm">
                          <div className="flex items-end gap-2">
                            <img
                              src={
                                image
                                  ? URL.createObjectURL(image)
                                  : currentUser.profilePicture
                              }
                              alt="Profile picture"
                              className="w-full h-full object-cover border-2 border-blue-400 rounded-sm"
                              title="Choose new profile"
                              onClick={() => filePickerRef.current.click()}
                            />
                            {/* <img
                                  src={assets.upload_icon}
                                  alt="upload icon"
                                  className="bg-red-700 w-16 rounded-sm"
                                  /> */}

                            {/* <div className="w-full flex items-center justify-center gap-2 -mt-2"> */}

                            <Button
                              disabled={loading}
                              type={"button"}
                              text={"Cancel"}
                              className={`w-fit border border-bgDark hover:bg-lightBgHover mt-6 ${
                                loading && "opacity-90"
                              } text-xs border-borderColor text-textColor3 hover:border-red-500 hover:text-red-500`}
                              handleClick={() => setIsEditProfile(false)}
                            />

                            <Button
                              disabled={loading}
                              type={"submit"}
                              text={loading ? "Saving..." : "Save"}
                              className={`w-fit border border-bgDark hover:bg-lightBgHover mt-6 ${
                                loading && "opacity-90"
                              } text-xs border-borderColor text-textColor3 hover:border-borderColorHover hover:text-textColor2`}
                            />

                            {/* <button
                        disabled={loading}
                        type="button"
                        onClick={handleChangeProfieImage}
                      >
                        Save
                      </button> */}

                            {/* </div> */}
                          </div>
                        </div>
                        <p className="text-xs font-light mt-1 text-textColor3">
                          Please select image and click save button to change
                          your profile picture.
                        </p>
                      </div>
                      {/* {image && (
                  <p className="text-xs font-light mt-1 text-textColor3">
                    Please click save button to change your profile picture.
                  </p>
                )} */}
                    </div>
                  </label>
                </form>
              ) : (
                <div className="w-full flex items-end gap-2">
                  <img
                    src={currentUser.profilePicture}
                    alt="Profile picture"
                    className="w-36 rounded-sm"
                  />

                  <Button
                    disabled={loading || isEdit}
                    type={"button"}
                    text={"Change image"}
                    className={`w-fit border border-bgDark ${
                      !isEdit && "hover:bg-lightBgHover"
                    } mt-6 ${
                      loading && "opacity-90"
                    } text-xs font-light text-textColor3 border-borderColor ${
                      !isEdit && "hover:border-borderColorHover"
                    }`}
                    handleClick={() => setIsEditProfile(true)}
                  />
                </div>
              )}

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

              {/* Subscription Info */}
              <div>
                <div className="-mb-2.5">
                  <Title2 text1={"Subscription Information"} />
                </div>
                {isSubscribed ? (
                  <div className="grid grid-cols-[1.5fr_3fr] gap-y-2.5 text-textColor3">
                    <p className="font-medium text-textColor1 whitespace-nowrap">
                      Subscribed Plan:
                    </p>
                    {/* <p className="font-medium">Basic</p> */}
                    <p className="text-blue-600 capitalize">
                      <Badge
                        badgeTitle={subscribedData.subscribedPlan}
                        textSize={"base"}
                        paddingX={"2"}
                        paddingY={"0.5"}
                      />
                    </p>

                    <p className="font-medium text-textColor1">Duration:</p>
                    <p className="capitalize">1 {subscribedData.duration}</p>

                    <p className="font-medium text-textColor1 whitespace-nowrap">
                      Created Date:
                    </p>
                    <p>
                      {new Date(subscribedData.createdDate).toLocaleString()}
                    </p>

                    <p className="font-medium text-textColor1 whitespace-nowrap">
                      Payment Method:
                    </p>
                    <p>{subscribedData.paymentMethod}</p>

                    <p className="font-medium text-textColor1 whitespace-nowrap">
                      Paid Amount:
                    </p>
                    <p>$ {subscribedData.amount}</p>

                    <p className="font-medium text-textColor1 whitespace-nowrap">
                      Payment Time:
                    </p>
                    {/* <p>{subscribedData.paymentTime}</p> */}
                    <p>
                      {new Date(subscribedData.paymentTime).toLocaleString()}
                    </p>

                    <p className="font-medium text-textColor1 whitespace-nowrap">
                      Next Billing:
                    </p>
                    {/* <p>{subscribedData.nextBilling}</p> */}
                    <p>
                      {new Date(subscribedData.nextBilling).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border border-borderColor rounded-sm p-6">
                    <p className="text-red-600 mb-2">Not subscribed yet!</p>
                    <p className="text-xs text-textColor3 -mb-2 text-center">
                      Click the below button to subscribe the package and enjoy
                      the features.
                    </p>
                    <Button
                      disabled={loading || isEditProfile || isEdit}
                      type={"button"}
                      text={"Subscribe Plan"}
                      className={`w-fit mt-6 text-xs font-light border-none outline-none text-textLight bg-bgDark hover:bg-opacity-[93%]`}
                      handleClick={() => navigate("/about")}
                    />
                  </div>
                )}
              </div>

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
                    <div className="">
                      <input
                        type="text"
                        id="phone"
                        className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                        placeholder="10-digits [e.g., 98(8-digits)]"
                        onChange={handleChange}
                        defaultValue={currentUser.phone}
                      />
                      {/* <p className="absolute flex flex-col gap-1 items-center font-light text-xs w-fit px-4 py-1 bg-lightBgHover text-textColor2 rounded-sm border border-borderColor right-14 sm:right-0  -top-2">
                      <span className="underline">Accept: 10 digits</span>
                      <span>98(8-digits)</span>
                    </p> */}
                    </div>
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
                            address: {
                              ...prev.address,
                              line1: e.target.value,
                            },
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
                            address: {
                              ...prev.address,
                              line2: e.target.value,
                            },
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
                  <div className="flex gap-2">
                    <Button
                      disabled={loading}
                      type={"button"}
                      text={"Cancel"}
                      className={`w-fit border border-bgDark hover:bg-lightBgHover mt-6 ${
                        loading && "opacity-90"
                      }  text-sm border-borderColor text-textColor3 hover:border-red-500 hover:text-red-500`}
                      handleClick={() => setIsEdit(false)}
                    />
                    <Button
                      disabled={loading}
                      type={"button"}
                      text={loading ? "Saving..." : "Save Profile"}
                      className={`w-fit border border-bgDark hover:bg-lightBgHover mt-6 ${
                        loading && "opacity-90"
                      }  text-sm border-borderColor text-textColor3 hover:border-borderColorHover hover:text-textColor2`}
                      handleClick={handleUpdateProfileData}
                    />
                  </div>
                ) : (
                  <Button
                    disabled={loading || isEditProfile}
                    type={"button"}
                    text={"Edit Profile Data"}
                    className={`w-fit border border-bgDark ${
                      !isEditProfile && "hover:bg-lightBgHover"
                    } mt-6 ${
                      loading && "opacity-90"
                    } font-light text-textColor3 border-borderColor ${
                      !isEditProfile && "hover:border-borderColorHover"
                    } text-sm`}
                    handleClick={() => setIsEdit(true)}
                  />
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-start -mt-4">
                <Link to={"/profile/update-password"}>
                  <Button
                    disabled={loading || isEditProfile || isEdit}
                    type={"button"}
                    text={"Update Password"}
                    className={`w-fit border border-bgDark ${
                      !isEdit && !isEditProfile && "hover:bg-lightBgHover"
                    } ${
                      loading && "opacity-90"
                    } font-light text-textColor3 border-borderColor ${
                      !isEdit &&
                      !isEditProfile &&
                      "hover:border-borderColorHover"
                    } text-sm`}
                  />
                </Link>
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
    )
  );
};

export default Profile;
