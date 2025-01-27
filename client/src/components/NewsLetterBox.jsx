import React, { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/subscriber/createSubscriber`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      if (res.ok) {
        toast.success(data.message);
        setLoading(false);
        setEmail("");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="text-center my-32">
      <p className="text-2xl font-medium text-textColor1">
        Subscribe now & read the latest blog
      </p>

      <p className="text-textColor3 mt-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, itaque.
      </p>

      <form
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-bgDark rounded-sm border-r-0 pl-3"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none bg-inherit"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          disabled={loading}
          type={"submit"}
          text={loading ? "Loading" : "Subscribe"}
          className={
            // "text-textLight bg-bgDark border-none outline-none bg-opacity-95 hover:bg-opacity-100"
            "text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%]"
          }
        />
      </form>
    </div>
  );
};

export default NewsLetterBox;
