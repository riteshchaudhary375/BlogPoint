import React from "react";
import { IoMdCheckmark } from "react-icons/io";

import Title2 from "./Title2";
import Button from "./Button";

const PricingSubscription = () => {
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
              <div className="border border-borderColor rounded-sm p-6 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-textColor2 text-sm font-medium">Starter</p>
                  <div className="flex flex-col">
                    <p className="text-3xl font-medium">Free</p>
                    <p className="text-sm text-textColor3">Per Month</p>
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
                    type={"button"}
                    text={"Get Started"}
                    className={"border border-textColor3 hover:bg-lightBgHover"}
                    handleClick={() => alert("Processing...")}
                  />
                </div>
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
                      $15
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
                    type={"button"}
                    text={"Get Started"}
                    className={"border border-textColor3 hover:bg-lightBgHover"}
                    handleClick={() => alert("Processing...")}
                  />
                </div>
              </div>

              {/* <!-- Plan 3 --> */}
              <div className="border border-borderColor rounded-sm p-6 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-textColor2 text-sm font-medium">
                    Enterprise
                  </p>
                  <p className="text-sm text-textColor3">
                    <span className="text-3xl text-textColor1 font-medium">
                      $155
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
                    type={"button"}
                    text={"Get Started"}
                    className={"border border-textColor3 hover:bg-lightBgHover"}
                    handleClick={() => alert("Processing...")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSubscription;
