import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    verifiedStatus: {
      type: String,
      enum: ["Unverified", "Verified"],
      default: "Unverified"
    },
    subscriptionType: {
      type: String,
      enum: ["Free", "Premium"],
      default: "Free"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;
