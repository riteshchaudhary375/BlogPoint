import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";

import { signInSuccess } from "../redux/user/userSlice.js";
import { assets } from "../assets/assets.js";
import { app } from "../firebase.js";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" }); // always select account
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch(`/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
        toast.success("Welcome, Have a great day!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      className="flex items-center justify-center gap-1.5  border border-bgDark hover:bg-lightBgHover  font-medium uppercase px-7 py-2 rounded-sm transition-all duration-300"
      onClick={handleGoogleClick}
    >
      <img src={assets.google} alt="Google icon" className="w-4 h-4" />
      Continue with Google
    </button>
  );
};

export default OAuth;
