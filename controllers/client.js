import Tour from "../models/Tour.js";
import TourStat from "../models/TourStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import TourOrder from "../models/TourOrder.js";
import Province from "../models/Province.js";

//PROVINCE
export const getProvince= async(req,res)=>{
  try{
    const province = await Province.find({})
    res.status(200).json(province)
  }
  catch(error){
    res.status(404).json({ message: error.message });
  }
}


// TOUR
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
export const createTour = async (req, res) => {
  try {
    const {
      category,
      title,
      departure,
      destination,
      description,
      images,
      numberDay,
      price,
      content,
      rating,
      maxNumber,
      thumbnail,
      codeTour,
    } = req.body;
    const tour = await Tour.create({
      category,
      title,
      departure,
      destination,
      description,
      images,
      numberDay,
      price,
      content,
      rating,
      maxNumber,
      thumbnail,
      codeTour,
    });
    res.status(201).json(tour);
    console.log(tour);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndRemove(req.params.id);
    res.status(204).json("delete success!");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateTour = async (req, res) => {
  try {
    let data = req.body;
    let id = req.params.id;
    let tour = await Tour.findByIdAndUpdate(id, data);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const findTour = async (req, res) => {
  try {
    let id = req.params.id;
    const tour = await Tour.findOne({ _id: id });
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CUSTOMER

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const findCustomer = async (req, res) => {
  try {
    let id = req.params.id;
    const customer = await User.findById({ _id: id });
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateCustomer = async (req, res) => {
  try {
    let data = req.body;
    let id = req.params.id;
    let customer = await User.findByIdAndUpdate(id, data);
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// TRANSACTIONs

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
export const createTransaction = async (req, res) => {
  try {
    const {
      userId,
      totalMoney,
      status,
      method,
      idTourOrder,
      bankName,
      accountName,
    } = req.body;
    const transaction = new Transaction.create({
      userId,
      totalMoney,
      status,
      method,
      idTourOrder,
      bankName,
      accountName,
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const findTransaction = async (req, res) => {
  try {
    let id = req.params.id;
    const transaction = new Transaction.findById({ _id: id });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// TOUR ORDER

export const getTourOrder = async (req, res) => {
  try {
    const tourOrders = await TourOrder.find();
    res.status(200).json(tourOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
