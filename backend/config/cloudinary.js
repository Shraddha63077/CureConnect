import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    if (
      !process.env.CLOUDINARY_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_SECRET_KEY
    ) {
      throw new Error("Cloudinary environment variables are not set properly");
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    console.log("Cloudinary configured successfully");
  } catch (error) {
    console.error("Cloudinary configuration error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectCloudinary;
