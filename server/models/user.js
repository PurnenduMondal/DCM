const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    classes: [
      {type: ObjectId, ref: 'Class', default: null},
    ],
    role: {
      type: String,
      default: "Student",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);