import express from "express";
import ReportData from "../model/model.report.js";

const reportRouter = express.Router();
// to report a url
reportRouter.post("/report", async (req, res) => {
  const { url, userId, domain } = req.body;
  if (!url || !userId || !domain) {
    return res.status(400).json({ message: "report data required" });
  }
  try {
    const reportData = new ReportData({
      userId,
      url,
      domain,
    });
    const savedReport = await reportData.save();
    if (!savedReport) {
      return res.status(500).json({ message: "Failed to save report" });
    }
    console.log("Report saved successfully:", savedReport);
    return res
      .status(200)
      .json({ message: "Report saved successfully", report: savedReport });
  } catch (error) {
    console.error("Error reporting URL:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// to get a report by userId
reportRouter.get("/report/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "userId required" });
  }
  try {
    const userReports = await ReportData.find({ userId }).sort({
      createdAt: -1,
    });

    if (!userReports || userReports.length === 0) {
      return res.status(404).json({ message: "No report found" });
    }
    console.log("User report fetched successfully:", userReports);
    return res.status(200).json({
      message: "User report fetched successfully",
      userReports: userReports,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default reportRouter;
