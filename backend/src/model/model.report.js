import mongoose, { mongo } from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["safe", "malicious"],
      required: true,
    },
     
  },
  {
    timestamps: true,
  }
);

const Report  = new mongoose.model("Report", reportSchema);
export default Report;