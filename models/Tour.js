import mongoose from "mongoose";
const TourSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["tourCultural", "tourEco", "tourResort", "tourDiscovery"],
    },
    title: {
      type: String,
      required: true,
    },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    numberDay: { type: Number, required: true },
    price: { type: Number, required: true },
    content: { type: String, required: true },
    departureSchedule: { type: Array, required: true },
    images: { type: Array, required: true },
    totalViews: { type: Number },
    rating: { type: Number },
    score: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    codeTour: { type: String, required: true },
  },
  { timeStamps: true }
);
const Tour = mongoose.model("Tour", TourSchema);
export default Tour;
