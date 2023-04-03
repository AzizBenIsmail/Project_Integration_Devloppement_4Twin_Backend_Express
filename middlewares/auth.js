const UnauthenticatedException = require("../exceptions/unauthenticated-exception");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("test");
    return res.status(401).send({ message: "Unauthorized" });
  }

  await jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    console.log("test1");
    if (err) return res.status(401).send({ message: "Unauthorized" });
    console.log("test1");
    try {
      console.log("test1");
      console.log(user._id);
      const authUser = await User.findById(user._id);
      req.user = authUser;
      next();
      console.log("test1");
    } catch (e) {
      return res.status(e.status || 401).send({ message: "User not found!" });
    }
  });
};
module.exports = auth;
