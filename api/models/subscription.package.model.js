import mongoose from "mongoose";

const subscriptionPackageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    subscribedPlan: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    createdDate: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    currencyCode: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    paymentTime: {
      type: String,
      required: true,
    },
    nextBilling: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const subscriptionPackage =
  mongoose.models.subscriptionPackage ||
  mongoose.model("subscriptionPackage", subscriptionPackageSchema);

export default subscriptionPackage;
