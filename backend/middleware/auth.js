const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token provided")
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded)
    req.user = decoded; // Attach decoded user data to the request
    next();
  } catch (error) {
    console.error("Token verification failed:", error)
    res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

module.exports = authenticate;
