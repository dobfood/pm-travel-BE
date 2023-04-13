import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getDashboard = async (req, res) => {
  try {
    //hardcoded values
    const currentMonth = "";
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
