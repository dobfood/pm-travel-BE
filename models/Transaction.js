import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema(
  {
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    totalMoney: Number,
    status: {
      type: String,
      enum: ["CHECKING", "SUCCESS", "FAILURE"],
      default: "CHECKING",
    },
    method: { type: String, enum: ["TRANSFER", "CASH"] },
    idTourOrder: {
      type: mongoose.Schema.Types.ObjectId, ref: 'TourOrder',
    },
    bankName: String,
    accountName: String,
  },
  { timestamps: true }
);
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
