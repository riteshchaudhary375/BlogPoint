import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img
          src={assets.logo_light}
          alt="logo"
          className="w-[170px] sm:w-[200px] md:w-[220px] lg:w-[240px]"
        />
      </Link>

      <ul className="hidden md:flex gap-5 text-sm lg:text-md text-gray-700 uppercase font-semibold">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0" />
        </NavLink>

        <NavLink to={"/projects"} className="flex flex-col items-center gap-1">
          <p>Projects</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0" />
        </NavLink>

        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0" />
        </NavLink>

        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
        <img
          src={assets.search_icon}
          alt="search"
          title="Search"
          className="w-5 sm:w-6 cursor-pointer"
          onClick={() => navigate("/search")}
        />

        <img
          src={assets.moon}
          alt="theme"
          title="Change Theme"
          className="w-5 sm:w-6 cursor-pointer"
        />

        <img
          src={assets.profile_icon}
          alt="user"
          title="Your Account"
          className="w-5 sm:w-6 cursor-pointer"
          onClick={() => navigate("/sign-in")}
        />

        <img
          src={assets.menu_icon}
          alt="menu"
          title="Menu"
          className="w-5 sm:w-6 cursor-pointer md:hidden"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Sidebar menu for small screen */}
      <div
        className={`absolute md:hidden top-0 right-4  left-[100%] overflow-hidden transition-all duration-300 ease-in-out bg-[#F4F6FC] ${
          visible && "left-0"
        }`}
      >
        <div className="flex flex-col text-gray-800 pt-4 min-h-screen">
          <div
            className="flex items-center justify-end p-3 text-lg"
            onClick={() => setVisible(false)}
          >
            <p className="cursor-pointer">Back</p>
            <img
              src={assets.right_arrow}
              alt="back"
              className="w-5 sm:w-7 cursor-pointer"
            />
          </div>

          <div className="flex flex-col items-center gap-6 font-semibold text-lg uppercase mt-12">
            <NavLink
              to={"/"}
              className="px-7 py-2 rounded-md"
              onClick={() => setVisible(false)}
            >
              Home
            </NavLink>
            <NavLink
              to={"/projects"}
              className="px-7 py-2 rounded-md"
              onClick={() => setVisible(false)}
            >
              Projects
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
    </div>
  );
};

export default Header;
