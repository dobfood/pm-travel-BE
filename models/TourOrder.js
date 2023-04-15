import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true },
    name:{type:String, required: true },
    phone:{type:String, required: true },
    date:{type:Number, required: true },
    totalPercent: { type: Number, required: true },
    totalMoney: { type: Number, required: true },
  },
  { timeStamps: true }
);
const Order = mongoose.model("Order", OrderSchema);
export default Order;
