import mongoose from "mongoose";
const TourStatSchema = new mongoose.Schema(
  {
    tourId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: {
      date: String,
      totalSales: Number,
      totalUnits: Number,
    },
  },
  { timestamps: true }
);
const TourStat = mongoose.model("TourStat", TourStatSchema);
export default TourStat;
