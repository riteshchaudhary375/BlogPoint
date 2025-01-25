import React from "react";

import Button from "./Button";
import Title2 from "../components/Title2";
import { assets } from "../assets/assets";

const ContactForm = () => {
  return (
    <div className="border border-borderColor rounded-sm px-4 py-6 flex flex-col items-center justify-center gap-6">
      <Title2 text1={"Get in"} text2={"Touch"} />

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 w-fit justify-center">
            <h3 className="text-textColor1 text-2xl text-center">
              Send us a message
            </h3>
            <img
              src={assets.contact_form_msg_icon}
              alt="message_icon"
              className="w-8 object-cover"
            />
          </div>
          <p className="text-textColor3 text-center">
            Feel free to reach out through contact form. Your feedback,
            questions, and suggestions are important to us as we strive to
            provide exceptional service to our{" "}
            <span className="text-textColor2 text-lg font-medium">
              blogpoint
            </span>{" "}
            community.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullname"
                className="text-sm cursor-pointer w-fit"
              >
                Fullname:
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="your full name"
                minLength={"7"}
                maxLength={"30"}
                required
                className="border border-borderColor outline-borderColorHover rounded-sm w-full p-2 text-sm bg-inherit"
                //   onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm cursor-pointer w-fit">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@email.com"
                required
                className="border border-borderColor outline-borderColorHover rounded-sm w-full p-2 text-sm bg-inherit"
                //   onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact" className="text-sm cursor-pointer w-fit">
                Contact:
              </label>
              <input
                type="text"
                id="contact"
                placeholder="your phone no."
                className="border border-borderColor outline-borderColorHover rounded-sm w-full p-2 text-sm bg-inherit"
                //   onChange={handleChange}
                //   required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-sm cursor-pointer w-fit">
                Message:
              </label>
              <textarea
                type="text"
                placeholder="Add a message..."
                rows={"4"}
                minLength={"5"}
                //   maxLength={"200"}
                className="border border-borderColor outline-borderColorHover rounded-sm w-full px-3 py-2 text-sm bg-inherit resize-none"
              />
            </div>

            <div className="text-center">
              <Button
                type={"submit"}
                text={"Send"}
                className={"border border-bgDark hover:bg-lightBgHover"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
