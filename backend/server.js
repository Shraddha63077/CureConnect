import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js"; // Importing doctorRouter
import userRouter from "./routes/userRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());


//api endpoints
app.use("/api/admin", adminRouter); // Existing admin routes
app.use("/api/doctor", doctorRouter); // New doctor routes
app.use('/api/user',userRouter)

app.get("/", (req, res) => {
  res.send("API WORKING GREAT");
});

app.listen(port, () => console.log("Server Started", port));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});
