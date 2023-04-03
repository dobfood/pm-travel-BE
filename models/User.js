import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 40,
    },
    avatar: String,
    email: { type: String, required: true, max: 40, unique: true },
    password: { type: String, required: true, min: 5 },
    phone: String,
    transaction: Array,
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "admin",
    },
    token: String,
    loginType: {
      type: String,
      enum: ["normal", "google", "facebook"],
      default: "normal",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
