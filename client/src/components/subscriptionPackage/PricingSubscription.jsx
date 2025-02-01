import React, { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

import Title2 from "../Title2";
import Button from "../Button";
import PayPalButtonsPopUp from "./PayPalButtonsPopUp";

const PricingSubscription = () => {
  const [showPayPalBtn1, setShowPayPalBtn1] = useState(false);
  const [showPayPalBtn2, setShowPayPalBtn2] = useState(false);
  const [showPayPalBtn3, setShowPayPalBtn3] = useState(false);

  /* const subscriptionPlans = [
    {
      type: "Basic",
      price: 5,
      pkg: "basic",
      duration: "month",
      features: [
        "Unlimited files in draft",
        "Unlimited viewers and commenters",
        "Unlimited editors on 3 team files",
        "1 team project",
        "30-days vision history",
        "Unlimited cloud storage",
      ],
    },
    {
      type: "Professional",
      price: 18,
      pkg: "professional",
      duration: "month",
      features: [
        "Unlimited files in draft",
        "Unlimited viewers and commenters",
        "Unlimited editors on 3 team files",
        "1 team project",
        "30-days vision history",
        "Unlimited cloud storage",
      ],
    },
    {
      type: "Enterprise",
      price: 209,
      pkg: "enterprise",
      duration: "year",
      features: [
        "Unlimited files in draft",
        "Unlimited viewers and commenters",
        "Unlimited editors on 3 team files",
        "1 team project",
        "30-days vision history",
        "Unlimited cloud storage",
      ],
    },
  ]; */

  const subscriptionPlans = [
    {
      planName: "basic",
      duration: "month",
    },
    {
      planName: "professional",
      duration: "month",
    },
    {
      planName: "enterprise",
      duration: "year",
    },
  ];
  // console.log(subscriptionPlans[2].planName);

  return (
    <div className="border border-borderColor rounded-sm p-4">
      <div className="lg:mx-12">
        <div className="text-center my-4">
          <Title2 text1={"Choose a"} text2={"Plan"} />
        </div>

        <div id="pricing" className="container">
          <div className="flex flex-col gap-2 items-center sm:flex-row sm:justify-between">
            <h2 className="text-2xl">Simple pricing based on your needs</h2>
            <p className="text-xs text-textColor3">
              Discover a variety of our advanced <br /> features. Unlimited and
              free for individuals.
            </p>
          </div>

          {/* <div className="flex flex-col sm:flex-row gap-12 mt-16"> */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 -mt-1">
              {/* <!-- Plan 1 --> */}
              <div className="relative border border-borderColor rounded-sm p-6 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-textColor2 text-sm font-medium">Basic</p>
                  {/* <div className="flex flex-col">
                    <p className="text-3xl font-medium">$0</p>
                    <p className="text-sm text-textColor3">Per Month</p>
                  </div> */}
                  <p className="text-sm text-textColor3">
                    <span className="text-3xl text-textColor1 font-medium">
                      $5
                    </span>{" "}
                    / month
                  </p>
                  <div className="flex flex-col gap-2 mt-6">
                    <p className="uppercase text-textColor3">Key Features</p>
                    {/* <ul className="space-y-3"> */}
                    <ul className="space-y-2">
                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                          Unlimited files in draft
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                          Unlimited viewers and commenters
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                          Unlimited editors on 3 team files
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor3/50 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-200 w-5 h-5" /> 1
                          team project
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor3/50 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-200 w-5 h-5" />{" "}
                          30-days vision history
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor3/50 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-200 w-5 h-5" />{" "}
                          Unlimited cloud storage
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Button */}
                <div className="text-center my-4">
                  <Button
                    disabled={showPayPalBtn2 || showPayPalBtn3}
                    type={"button"}
                    text={"Get Started"}
                    className={"border border-textColor3 hover:bg-lightBgHover"}
                    handleClick={() => setShowPayPalBtn1(true)}
                  />
                </div>
                {showPayPalBtn1 && !showPayPalBtn2 && !showPayPalBtn3 && (
                  <div
                    className={`absolute z-10 left-0 right-0 ${
                      showPayPalBtn1 ? "bottom-0" : "-bottom-44"
                    } bg-gradient-to-t from-gray-400 to-gray-100 border border-t-borderColor py-2 pt-6`}
                  >
                    <div className="w-full flex items-center justify-end">
                      <p
                        className="-mt-4 mr-4 mb-4 text-lg cursor-pointer hover:text-red-600"
                        onClick={() => setShowPayPalBtn1(false)}
                      >
                        X
                      </p>
                    </div>
                    <PayPalButtonsPopUp
                      planName={subscriptionPlans[0].planName}
                      duration={subscriptionPlans[0].duration}
                      setShowPayPalBtn1={setShowPayPalBtn1}
                    />
                  </div>
                )}
              </div>

              {/* <!-- Plan 2 --> */}
              <div className="relative border border-borderColor rounded-sm p-6 flex flex-col justify-between">
                <p className="text-blue-800 text-sm bg-indigo-100 rounded-full w-fit px-4 py-1.5 font-display font-semibold absolute top-0 right-8 -translate-y-1/2">
                  Most Popular
                </p>
                <div className="flex flex-col gap-3">
                  <p className="text-textColor2 text-sm font-medium">
                    Professional
                  </p>
                  <p className="text-sm text-textColor3">
                    <span className="text-3xl text-textColor1 font-medium">
                      $18
                    </span>{" "}
                    / month
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <p className="uppercase text-textColor3">Key Features</p>
                  {/* <ul className="space-y-3"> */}
                  <ul className="space-y-2">
                    <li className="flex items-center gap-4">
                      <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                        <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                        Unlimited files in draft
                      </span>
                    </li>

                    <li className="flex items-center gap-4">
                      <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                        <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                        Unlimited viewers and commenters
                      </span>
                    </li>

                    <li className="flex items-center gap-4">
                      <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                        <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                        Unlimited editors on 3 team files
                      </span>
                    </li>

                    <li className="flex items-center gap-4">
                      <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                        <IoMdCheckmark className="text-blue-500 w-5 h-5" /> 1
                        team project
                      </span>
                    </li>

                    <li className="flex items-center gap-4">
                      <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                        <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                        30-days vision history
                      </span>
                    </li>

                    <li className="flex items-center gap-4">
                      <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                        <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                        Unlimited cloud storage
                      </span>
                    </li>
                  </ul>
                </div>
                {/* Button */}
                <div className="text-center my-4">
                  <Button
                    disabled={showPayPalBtn1 || showPayPalBtn3}
                    type={"button"}
                    text={"Get Started"}
                    className={"border border-textColor3 hover:bg-lightBgHover"}
                    handleClick={() => setShowPayPalBtn2(true)}
                  />
                </div>
                {!showPayPalBtn1 && showPayPalBtn2 && !showPayPalBtn3 && (
                  <div
                    className={`absolute z-10 left-0 right-0 ${
                      showPayPalBtn2 ? "bottom-0" : "-bottom-44"
                    } bg-gradient-to-t from-gray-400 to-gray-100 border border-t-borderColor py-2 pt-6`}
                  >
                    <div className="w-full flex items-center justify-end">
                      <p
                        className="-mt-4 mr-4 mb-4 text-lg cursor-pointer hover:text-red-600"
                        onClick={() => setShowPayPalBtn2(false)}
                      >
                        X
                      </p>
                    </div>
                    <PayPalButtonsPopUp
                      planName={subscriptionPlans[1].planName}
                      duration={subscriptionPlans[1].duration}
                      setShowPayPalBtn2={setShowPayPalBtn2}
                    />
                  </div>
                )}
              </div>

              {/* <!-- Plan 3 --> */}
              <div className="relative border border-borderColor rounded-sm p-6 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-textColor2 text-sm font-medium">
                    Enterprise
                  </p>
                  <p className="text-sm text-textColor3">
                    <span className="text-3xl text-textColor1 font-medium">
                      $209
                    </span>{" "}
                    / year
                  </p>
                  <div className="flex flex-col gap-2 mt-6">
                    <p className="uppercase text-textColor3">Key Features</p>
                    {/* <ul className="space-y-3"> */}
                    <ul className="space-y-2">
                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                          Unlimited files in draft
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                          Unlimited viewers and commenters
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                          Unlimited editors on 3 team files
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-500 w-5 h-5" /> 1
                          team project
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                          30-days vision history
                        </span>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className="text-sm text-textColor2 font-medium flex gap-1 items-center justify-center w-fit">
                          <IoMdCheckmark className="text-blue-500 w-5 h-5" />{" "}
                          Unlimited cloud storage
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Button */}
                <div className="text-center my-4">
                  <Button
                    disabled={showPayPalBtn1 || showPayPalBtn2}
                    type={"button"}
                    text={"Get Started"}
                    className={"border border-textColor3 hover:bg-lightBgHover"}
                    handleClick={() => setShowPayPalBtn3(true)}
                  />
                </div>
                {!showPayPalBtn1 && !showPayPalBtn2 && showPayPalBtn3 && (
                  <div
                    className={`absolute z-10 left-0 right-0 ${
                      showPayPalBtn3 ? "bottom-0" : "-bottom-44"
                    } bg-gradient-to-t from-gray-400 to-gray-100 border border-t-borderColor py-2 pt-6`}
                  >
                    <div className="w-full flex items-center justify-end">
                      <p
                        className="-mt-4 mr-4 mb-4 text-lg cursor-pointer hover:text-red-600"
                        onClick={() => setShowPayPalBtn3(false)}
                      >
                        X
                      </p>
                    </div>
                    <PayPalButtonsPopUp
                      planName={subscriptionPlans[2].planName}
                      duration={subscriptionPlans[2].duration}
                      setShowPayPalBtn3={setShowPayPalBtn3}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSubscription;
