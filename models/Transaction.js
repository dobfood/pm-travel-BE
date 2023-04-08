import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    totalMoney: Number,
    status: {
      type: String,
      enum: ["CHECKING", "SUCCESS", "FAILURE"],
      default: "CHECKING",
    },
    method: { type: String, enum: ["TRANSFER", "CASH"] },
    idTourOrder: {
      type: mongoose.Types.ObjectId,
      of: Number,
    },
    bankName: String,
    accountName: String,
  },
  { timestamps: true }
);
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
