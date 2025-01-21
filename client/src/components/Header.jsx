import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserSuccess } from "../redux/user/userSlice.js";
import { assets } from "../assets/assets";
import HorizontalLine from "./HorizontalLine";
import toast from "react-hot-toast";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setToggleProfile(false);
        return;
      } else {
        dispatch(signOutUserSuccess(data));
        setToggleProfile(false);
        toast.success("Logged out successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="mb-20 md:mb-24">
      {/* Desktop view */}
      <div className="container bg-bgLight fixed top-0 left-0 right-0 z-50">
        {/* <div className="flex items-center justify-between py-3 md:py-4 font-medium bg-bgLight border-gray-400 border-b-2 "> */}
        <div className="flex items-center justify-between py-3 md:py-4 font-medium">
          <Link to={"/"}>
            <img
              src={assets.logo_light}
              alt="logo"
              className="w-[170px] sm:w-[200px] md:w-[220px] lg:w-[240px]"
            />
          </Link>

          <ul className="hidden md:flex gap-5 text-sm lg:text-md text-textColor1 uppercase font-medium mt-2">
            <NavLink to={"/"} className="flex flex-col items-center gap-1">
              <p>Home</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-bgDark opacity-0" />
            </NavLink>

            <NavLink to={"/blogs"} className="flex flex-col items-center gap-1">
              <p>Blogs</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-bgDark opacity-0" />
            </NavLink>

            <NavLink to={"/about"} className="flex flex-col items-center gap-1">
              <p>About</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-bgDark opacity-0" />
            </NavLink>

            <NavLink
              to={"/contact"}
              className="flex flex-col items-center gap-1"
            >
              <p>Contact</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-bgDark opacity-0" />
            </NavLink>
          </ul>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
            <img
              src={assets.search_icon}
              alt="search"
              title="Search"
              className="w-5 sm:w-6 cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => navigate("/blogs")}
            />
            {currentUser ? (
              <div className="group relative">
                <img
                  src={currentUser.profilePicture}
                  alt="Profile picture"
                  title="Your Profile"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer object-cover"
                  onClick={() => {
                    setToggleProfile(!toggleProfile);
                  }}
                />
                {toggleProfile && (
                  <div className="absolute -right-2 md:right-2 pt-1">
                    <div className="flex flex-col border border-borderColor rounded-sm bg-bgLight shadow-sm">
                      <div className="flex flex-col gap-0 px-4 py-2.5">
                        <p className="text-sm font-light">
                          @{currentUser.username}
                        </p>
                        <p className="text-sm font-medium">
                          {currentUser.email}
                        </p>
                      </div>

                      <HorizontalLine />

                      <div className="flex flex-col gap-1 my-1 cursor-pointer font-light text-base">
                        {currentUser.isAdmin ? (
                          <Link
                            to={"/dashboard?tab=profile"}
                            onClick={() => setToggleProfile(false)}
                          >
                            <p className="hover:bg-lightBgHover px-4 py-1.5">
                              Profile
                            </p>
                          </Link>
                        ) : (
                          <Link
                            to={"/profile"}
                            onClick={() => setToggleProfile(false)}
                          >
                            <p className="hover:bg-lightBgHover px-4 py-1.5">
                              Profile
                            </p>
                          </Link>
                        )}

                        <HorizontalLine />

                        {currentUser.isAdmin && (
                          <>
                            <Link
                              // to={"/dashboard"}
                              to={"/dashboard?tab=dashboard"}
                              onClick={() => setToggleProfile(false)}
                            >
                              <p className="hover:bg-lightBgHover px-4 py-1.5">
                                Dashboard
                              </p>
                            </Link>
                            <HorizontalLine />
                          </>
                        )}
                        <p
                          className="hover:bg-lightBgHover px-4 py-1.5"
                          onClick={handleSignOut}
                        >
                          Sign out
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <img
                src={assets.profile_icon}
                alt="user"
                title="Your Account"
                className="w-5 sm:w-6 cursor-pointer opacity-90 hover:opacity-100"
                onClick={() => navigate(currentUser ? "/profile" : "/sign-in")}
              />
            )}

            <img
              src={assets.menu_icon}
              alt="menu"
              title="Menu"
              className="w-5 sm:w-6 cursor-pointer md:hidden opacity-90 hover:opacity-100"
              onClick={() => setVisible(true)}
            />
          </div>
        </div>

        <HorizontalLine />
      </div>

      {/* Sidebar menu for small screen */}
      {/*  <div
        className={`absolute bg-red-400 md:hidden top-0 right-0 left-0 max-h-screen overflow-y-hidden transition-all duration-300 ease-in-out bg-[#F4F6FC] ${
          visible ? "left-[0%]" : "left-[100%]"
        }`}
      > */}
      <div
        className={`fixed top-0 right-0 left-0 bottom-0 overflow-hidden transition-all duration-300 ease-in-out bg-bgLight z-50 ${
          visible ? "left-[0%]" : "left-[100%]"
        }`}
      >
        <div className="flex flex-col text-textColor1 min-h-screen">
          <div
            className="flex items-center justify-end text-lg mb-2 pt-4 pr-4"
            onClick={() => setVisible(false)}
          >
            <p className="cursor-pointer text-textColor1 text-xl">Back</p>
            <img
              src={assets.right_arrow}
              alt="back"
              className="w-5 sm:w-7 cursor-pointer text-textColor1 scale-125"
            />
          </div>

          {/* <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"> */}
          <div className="container">
            <HorizontalLine />
          </div>

          <div className="flex flex-col items-center gap-6 font-medium text-lg uppercase mt-12">
            <NavLink
              to={"/"}
              className="px-7 py-2 rounded-md"
              onClick={() => setVisible(false)}
            >
              Home
            </NavLink>
            <NavLink
              to={"/blogs"}
              className="px-7 py-2 rounded-md"
              onClick={() => setVisible(false)}
            >
              Blogs
            </NavLink>
            <NavLink
              to={"/about"}
              className="px-7 py-2 rounded-md"
              onClick={() => setVisible(false)}
            >
              About
            </NavLink>
            <NavLink
              to={"/contact"}
              className="px-7 py-2 rounded-md"
              onClick={() => setVisible(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
