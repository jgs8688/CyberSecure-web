import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryData = async (pdfRelativePath) => {
  try {
    const filePath = path.join(__dirname, "..", "..", pdfRelativePath);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      public_id: `websure_reports/${Date.now()}`,
      use_filename: true,
    });

    console.log("PDF uploaded to Cloudinary!");

    const pdfUrl = result.secure_url;

    console.log("PDF URL:", pdfUrl);
    console.log("Public ID:", result.public_id);

    return {
      url: pdfUrl,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error(" Upload failed:", error);
    throw error;
  }
};

export default cloudinaryData;
