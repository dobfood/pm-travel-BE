import mongoose from "mongoose";

const TourOrderSchema = new mongoose.Schema(
  {
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    numberDay: { type: Number, required: true },
    price: { type: Number, required: true },    
    content: { type: String, required: true },
    departureSchedule: { type: Array, required: true },
    images: { type: Array, required: true },
    totalViews: { type: Number, default: 0 },
    rating: { type: Number },
    score: { type: Number, required: true },
    thumbnail: { type: String, required: true },
  },
  { timeStamps: true }
);
const TourOrder = mongoose.model("TourOrder", TourOrderSchema);
export default TourOrder;
