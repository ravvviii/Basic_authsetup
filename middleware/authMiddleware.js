// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

function isLoggedIn(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Login First" });
  }
  try {
    const decoded = jwt.verify(token, "abcsdygf");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}


module.exports = isLoggedIn;
