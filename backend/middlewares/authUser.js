import jwt from "jsonwebtoken";

//user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({
        success: false,
        message: "Authorization header is missing.",
      });
    }
    const token = authHeader.split(" ")[1]; // Get token from Authorization header
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: token_decode.id }; // Assign user ID to req.user

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
