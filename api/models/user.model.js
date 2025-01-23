import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    address: {
      type: Object,
      default: { line1: "", line2: "" },
    },
    gender: {
      type: String,
      default: "Not Selected",
    },
    dob: {
      type: String,
      default: "Not Selected",
    },
    phone: {
      type: String,
      default: "Not Available",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isCreator: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
