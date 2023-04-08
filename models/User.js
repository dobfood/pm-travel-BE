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
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    transaction: Array,
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    token: String,
    loginType: {
      type: String,
      enum: ["normal", "google"],
      default: "normal",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
