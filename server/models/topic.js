const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    class: {
      type: ObjectId,
      ref: "User",
    },
    topics: [{
      name: String,
      video: String,
      note: String,
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", userSchema);