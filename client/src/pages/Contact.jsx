import React from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import NewsLetterBox from "../components/NewsLetterBox";

import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10">
        <Title text1={"contact"} text2={"us"} />
      </div>

      <div className="my-12 flex flex-col justify-center md:flex-row gap-10 mb-32">
        {/* Left */}
        <img
          src={assets.blog_contact_img}
          alt="image"
          className="w-full md:max-w-[480px] object-cover"
        />

        {/* Right */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-medium text-xl text-textColor2">Our Office</p>

          <p className="text-textColor3">
            Ring Road, Maharajgunj <br />
            Kathmandu 44600, Nepal
          </p>

          <p className="text-textColor3">
            Tel: (+977) 9845715149 <br />
            Email: riteshchaudhary375@gmail.com
          </p>

          <p className="font-medium text-xl text-textColor2">
            Careers at{" "}
            <span className="font-semibold text-textColor1">blogpoint.</span>
          </p>

          <p className="text-textColor3">
            Learn more about our teams and jobs opening.
          </p>

          <Button
            type={"button"}
            text={"Explore Jobs"}
            className={"border border-bgDark hover:bg-lightBgHover"}
            handleClick={() => alert("Processing...")}
          />
        </div>
      </div>

      {/* News-Letter Box */}
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
