import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
      process.exit(1); // Exit process with failure
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
