import jwt from "jsonwebtoken";

//doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }
    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.docId = token_decode.id; // Assign user ID to req.docId

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
