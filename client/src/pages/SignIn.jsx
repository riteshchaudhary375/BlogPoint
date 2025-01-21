import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { assets } from "../assets/assets.js";
import Title from "../components/Title";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const { error, loading } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password)
      return dispatch(signInFailure("All fields required!"));
    try {
      dispatch(signInStart());
      const res = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
        toast.success("Welcome, Have a great day!");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

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
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm cursor-pointer w-fit">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@email.com"
                  required
                  className="border border-borderColor outline-borderColorHover rounded-sm w-full p-2 text-sm bg-inherit"
                  onChange={handleChange}
                />
              </div>

              {/* Password box */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-sm cursor-pointer w-fit"
                >
                  Your password
                </label>
                <div className="relative flex items-center bg-inherit w-full border border-borderColor outline-borderColorHover rounded-sm">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="⁎⁎⁎⁎⁎⁎⁎"
                    required
                    className="w-full p-2 text-sm bg-inherit"
                    onChange={handleChange}
                  />
                  {!showPassword ? (
                    <img
                      src={assets.eye}
                      alt="icon"
                      className="absolute w-5 h-5 object-cover object-center cursor-pointer right-2"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <img
                      src={assets.eye_closed}
                      alt="icon"
                      className="absolute w-5 h-5 object-cover object-center cursor-pointer right-2"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p className="cursor-pointer hover:underline">
                  Forgot password?
                </p>
                {/* <p
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate("/sign-up")}
                > */}
                <Link
                  to={"/sign-up"}
                  className="cursor-pointer hover:underline"
                >
                  Create account
                </Link>
                {/* </p> */}
              </div>

              <Button
                disabled={loading}
                type={"submit"}
                text={loading ? "Loading..." : "Login"}
                className={`text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%] mt-3 ${
                  loading && "opacity-90"
                }`}
              />

              {/* Google OAuth */}
              <OAuth />
            </form>

            {/* Error message */}
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
