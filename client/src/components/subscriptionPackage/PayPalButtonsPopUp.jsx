import React from "react";
import { useSelector } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PayPalButtonsPopUp = ({
  planName,
  duration,
  setShowPayPalBtn1,
  setShowPayPalBtn2,
  setShowPayPalBtn3,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  const navigate = useNavigate();

  // Create a subscription
  const handleCreateSubscription = async () => {
    /* console.log("planName-client", planName);
    console.log("duration-client", duration); */

    try {
      const res = await fetch(
        `/api/subscriptionPackage/create/${currentUser._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan_name: planName,
            duration: duration,
          }),
        }
      );
      const data = await res.json();
      /* if (!res.ok) {
        toast.error(data.message);
      }
      if (res.ok) {
        // console.log(data);
        return data.paypalSubscription.id;
      } */
      // console.log(data);
      // console.log("data.paypalSubscription.id: ", data.paypalSubscription.id);

      return data.paypalSubscription.id;
    } catch (error) {
      // toast.error(error.message);
      console.log(error);
    }
  };

  // Approve on paid for subscription
  const handleApprove = async (payedData) => {
    // console.log("Approve handle payedData: ", payedData);

    if (!payedData.orderID) {
      toast.error("Order detail not found!");
      return;
    }

    try {
      const res = await fetch(
        `/api/subscriptionPackage/savePayment/${currentUser._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify(payedData),
          body: JSON.stringify({
            orderID: payedData.orderID,
            subscriptionID: payedData.subscriptionID,
            subscribedMethod: "PayPal",
          }),
        }
      );
      const data = await res.json();
      // console.log("Approve res data: ", data);

      if (!res.ok) {
        toast.error(data.message);
        console.log("error res data: ", data.message);
        navigate("/payment-failed");
        return;
      }
      if (res.ok) {
        navigate("/payment-success");
        toast.success(data.message);
        // console.log("success res data: ", data.paymentData);
      }

      if (planName === "basic") {
        setShowPayPalBtn1(false);
      }

      if (planName === "professional") {
        setShowPayPalBtn2(false);
      }

      if (planName === "enterprise") {
        setShowPayPalBtn3(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="w-[70%] mx-auto">
      {/* <p className="text-red-500 text-2xl">Button</p> */}
      <PayPalButtons
        // style={{ shape: "pill", layout: "vertical" }}
        style={{ shape: "pill", layout: "vertical", color: "blue" }}
        createSubscription={handleCreateSubscription}
        onApprove={handleApprove}
      />
    </div>
  );
};

export default PayPalButtonsPopUp;
