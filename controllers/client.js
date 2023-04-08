import Tour from "../models/Tour.js";
import TourStat from "../models/TourStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    const toursWithStats = await Promise.all(
      tours.map(async (tour) => {
        const stat = await TourStat.find({
          tourId: tour._id,
        });
        return {
          ...tour._doc,
          stat,
        };
      })
    );
    res.status(200).json(toursWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getTransactions = async (req, res) => {
  try {
    // sort should look like this : {"fields:"idUser","sort":"desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like {userId : -1}
    const generalSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.filed]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generalSort() : {};

    const transactions = await Transaction.find({
      $or: [
        {
          userId: { $regex: new RegExp(search, "i") },
          totalMoney: { $regex: new RegExp(search, "i") },
        },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    res.status(200).json(transactions, total);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
