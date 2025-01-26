import React, { useState } from "react";
import { toast } from "react-hot-toast";

import Button from "./Button";
import Title2 from "../components/Title2";
import { assets } from "../assets/assets";

const ContactForm = () => {
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname) return toast.error("Fullname required!");
    if (!formData.email) return toast.error("Email required!");
    if (!formData.message) return toast.error("Message required!");

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/message/createMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(data.message);
        return;
      }
      if (res.ok) {
        setLoading(false);
        setError(null);
        setFormData(e.target.reset());
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

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
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullname"
                className="text-sm cursor-pointer w-fit"
              >
                Fullname: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="your full name"
                minLength={"7"}
                maxLength={"30"}
                className="border border-borderColor outline-borderColorHover rounded-sm w-full p-2 text-sm bg-inherit"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm cursor-pointer w-fit">
                Email: <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@email.com"
                className="border border-borderColor outline-borderColorHover rounded-sm w-full p-2 text-sm bg-inherit"
                onChange={handleChange}
                required
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
                onChange={handleChange}
                // required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-sm cursor-pointer w-fit">
                Message: <span className="text-red-500">*</span>
              </label>
              <textarea
                type="text"
                id="message"
                placeholder="Add a message..."
                rows={"4"}
                minLength={"5"}
                //   maxLength={"200"}
                className="border border-borderColor outline-borderColorHover rounded-sm w-full px-3 py-2 text-sm bg-inherit resize-none"
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center">
              <Button
                disabled={loading}
                type={"submit"}
                text={loading ? "Sending" : "Send"}
                className={"border border-bgDark hover:bg-lightBgHover"}
              />
            </div>

            {/* Error message */}
            {error && <p className="text-xs text-red-600 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
