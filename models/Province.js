import mongoose from "mongoose";
const ProvinceSchema = new mongoose.Schema(
  {
    title: String,
  },
  { timestamps: true }
);
const Province = mongoose.model("Province", ProvinceSchema);
export default Province;
