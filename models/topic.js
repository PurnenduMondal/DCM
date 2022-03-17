const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name:  {
      type: String,
      trim: true,
    },
    class: {
      type: ObjectId,
      ref: "User",
    },    
    video_public_id: {
      type: String,
      trim: true,
      default: null,
    },
    video_url: {
      type: String,
      trim: true,
      default: null,
    },
    note: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", userSchema);