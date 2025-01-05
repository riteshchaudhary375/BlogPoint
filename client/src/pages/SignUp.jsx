import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Title from "../components/Title";
import Button from "../components/Button";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All filelds required.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setErrorMessage(data.message);
        return;
      }
      if (res.ok) {
        setLoading(false);
        setErrorMessage(null);
        navigate("/sign-in");
        toast.success(data.message);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    // <div className="min-h-screen pt-8">
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-inherit shadow-md border border-bgDark/20 rounded-sm w-[350px] sm:w-96 ">
        <div className="p-8 flex flex-col gap-3">
          <Title text1={"Sign"} text2={"Up"} />

          <p className="text-xs font-light">
            You can log in with your email and password or with Google.
          </p>

          <div className="">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-sm">
                  Your name
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="full name"
                  required
                  className="border border-bgDark/30 rounded-sm w-full p-2 outline-bgDark/50 text-sm bg-inherit"
                  onChange={handleChange}
                />
              </div>

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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <p className="cursor-pointer hover:underline">
                  Forgot password?
                </p>
                {/* <p
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate("/sign-in")}
                > */}
                <Link
                  to={"/sign-in"}
                  className="cursor-pointer hover:underline"
                >
                  Login here
                </Link>
                {/* </p> */}
              </div>

              <Button
                type={"submit"}
                text={loading ? "Loading..." : "Create"}
                disabled={loading}
                className={`text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%] mt-3 ${
                  loading && "opacity-90"
                }`}
              />

              {/* OAuth Google */}
              <OAuth />
            </form>

            {/* Error message */}
            {errorMessage && (
              <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
