import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import HorizontalLine from "./HorizontalLine";

const Footer = ({ showModal, showMessageModal }) => {
  return (
    <footer
      className={`container ${
        showModal || showMessageModal ? "bodyFixed" : undefined
      }`}
    >
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <Link to={"/"}>
            <img
              src={assets.logo_light}
              alt="logo"
              className="w-[170px] sm:w-[200px] md:w-[220px] lg:w-[240px] mb-5"
            />
          </Link>
          <p className="w-full md:2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iste
            eius, quidem recusandae ducimus eaque.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 uppercase">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link
              to={"/"}
              className="w-fit hover:underline hover:text-gray-800"
            >
              <li>Home</li>
            </Link>

            <Link
              to={"/blogs"}
              className="w-fit hover:underline hover:text-gray-800"
            >
              <li>Blogs</li>
            </Link>

            <Link
              to={"/about"}
              className="w-fit hover:underline hover:text-gray-800"
            >
              <li>About</li>
            </Link>

            <Link
              to={"/contact"}
              className="w-fit hover:underline hover:text-gray-800"
            >
              <li>Contact</li>
            </Link>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 uppercase">Legal</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="w-fit hover:underline hover:text-gray-800 cursor-pointer">
              Privacy Policy
            </li>
            <li className="w-fit hover:underline hover:text-gray-800 cursor-pointer text-nowrap">
              Terms & Conditions
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <HorizontalLine />

        <div className="py-5 text-sm w-full sm:flex sm:items-center sm:justify-between">
          <p>
            &#169; {new Date().getFullYear()}{" "}
            <span className="font-semibold">
              <Link to={"/"}>blogpoint</Link>
            </span>{" "}
            |{" "}
            <span>
              <a href="#" className="hover:underline">
                All Right Reserved.
              </a>
            </span>
          </p>

          <ul className="flex gap-5 mt-4 sm:mt-0 sm:justify-center">
            <li>
              <a href="#">
                <img
                  src={assets.fb}
                  alt="facebook"
                  className="w-5 md:w-6 opacity-80 hover:opacity-100"
                  title="Facebook"
                />
              </a>
            </li>

            <li>
              <a href="#">
                <img
                  src={assets.instagram}
                  alt="instagram"
                  className="w-5 md:w-6 opacity-80 hover:opacity-100"
                  title="Instagram"
                />
              </a>
            </li>

            <li>
              <a href="#">
                <img
                  src={assets.twitter}
                  alt="twitter"
                  className="w-5 md:w-6 opacity-80 hover:opacity-100"
                  title="Twitter"
                />
              </a>
            </li>

            <li>
              <a href="#">
                <img
                  src={assets.linkedin}
                  alt="linkedin"
                  className="w-5 md:w-6 opacity-80 hover:opacity-100"
                  title="Linkedin"
                />
              </a>
            </li>

            <li>
              <a href="#">
                <img
                  src={assets.github}
                  alt="github"
                  className="w-5 md:w-6 opacity-80 hover:opacity-100"
                  title="GitHub"
                />
              </a>
            </li>

            <li>
              <a href="#">
                <img
                  src={assets.dribble}
                  alt="dribble"
                  className="w-5 md:w-6 opacity-80 hover:opacity-100"
                  title="Dribble"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
