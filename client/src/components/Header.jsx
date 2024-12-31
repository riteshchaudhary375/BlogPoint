import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";
import HorizontalLine from "./HorizontalLine";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="mb-20 md:mb-24 z-40">
      {/* Desktop view */}
      <div className="fixed left-0 top-0 right-0 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {/* <div className="flex items-center justify-between py-3 md:py-4 font-medium bg-bgLight border-gray-400 border-b-2 "> */}
        <div className="flex items-center justify-between py-3 md:py-4 font-medium bg-bgLight">
          <Link to={"/"}>
            <img
              src={assets.logo_light}
              alt="logo"
              className="w-[170px] sm:w-[200px] md:w-[220px] lg:w-[240px]"
            />
          </Link>

          <ul className="hidden md:flex gap-5 text-sm lg:text-md text-textColor1 uppercase font-medium">
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
              onClick={() => navigate("/search")}
            />

            <img
              src={assets.moon}
              alt="theme"
              title="Change Theme"
              className="w-5 sm:w-6 cursor-pointer opacity-90 hover:opacity-100"
            />

            <img
              src={assets.profile_icon}
              alt="user"
              title="Your Account"
              className="w-5 sm:w-6 cursor-pointer opacity-90 hover:opacity-100"
              onClick={() => navigate("/sign-in")}
            />

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

          <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
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
