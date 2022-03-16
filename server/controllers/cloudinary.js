const cloudinary = require("cloudinary");
const Topic = require("../models/topic")

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.upload = async (req, res) => {
  const topicId = req.body.topicId;
  const content = req.body.content;
  const contentType = req.body.contentType;
  if (contentType === "video") {
    try {
      let result = await cloudinary.v2.uploader.upload(content, {
        public_id: `${Date.now()}`,
        resource_type: "auto", // jpeg, png
      })
      const topic = await Topic.findOneAndUpdate(
        { _id: topicId }, 
        {
          video_public_id: result.public_id,
          video_url: result.secure_url,
        }, 
        {new: true})
        .exec()
      res.json(topic)
    } catch (e) {
      console.error(e);
    }
  } else {
    const topic = await Topic.findOneAndUpdate(
      { _id: topicId }, 
      {note: content}, 
      {new: true})
      .exec()
    res.json(topic)
  }
};

exports.remove = (req, res) => {
  let public_id = req.body.public_id;
  console.table(public_id)
  cloudinary.uploader.destroy(public_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.json("ok");
  });
};