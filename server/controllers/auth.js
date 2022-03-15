const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { first_name, last_name, email, role} = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { first_name, last_name, email, role },
    { new: true }
  );
  
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      first_name,
      last_name,
      email,
      role,
    }).save();
    
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};