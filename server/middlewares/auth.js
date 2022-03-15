const admin = require("../firebase");
const User = require("../models/user");


exports.authCheck = async (req, res, next) => {
  try { 
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken)

    req.user = req.body 
    req.user.email = firebaseUser.email
    next();

  } catch (err) {
     console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.teacherCheck = async (req, res, next) => {
  const { email } = req.user;

  const user = await User.findOne({ email }).exec();

  if (user.role !== "Teacher") {
    res.status(403).json({
      err: "Teacher resource. Access denied.",
    });
  } else {
    next();
  }
};