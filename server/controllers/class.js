const Class = require("../models/class");
const User = require("../models/user");

exports.create = async (req, res) => {
  const { subject } = req.body;

  let teacher  = await User.findOne({ email: req.user.email }).exec();
  const newClass = await new Class({ subject, teacher }).save();
  res.json(newClass);
};

exports.findOne = (req, res) => {
  date = req.params.id
  Class.findOne({ date }).populate('teacher', 'first_name last_name')
  .then(data => res.json(data))
}