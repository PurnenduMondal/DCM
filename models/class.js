const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    subject: String,
    teacher: {
      type: ObjectId,
      ref: "User",
    },
    topics: [
      {type: ObjectId, ref: 'Topic', default: null},
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", userSchema);