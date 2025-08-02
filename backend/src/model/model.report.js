import mongoose, { mongo } from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name:{
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
     
  },
  {
    timestamps: true,
  }
);

const ReportData  = new mongoose.model("ReportData", reportSchema);
export default ReportData;