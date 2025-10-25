const jwt = require("jsonwebtoken");
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  console.log("here 1")
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from Header
      token = req.headers.authorization.split(' ')[1];
      console.log("here 2")
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("here 3")
      // Get user from token (subtract password)
      req.user = await User.findById(decoded.id).select('-password')
      console.log("here 4")
      next()
    } catch (error) {
      return res.status(404).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
}

module.exports = { protect }

//"console.log(require('crypto').randomBytes(64).toString('hex'));"