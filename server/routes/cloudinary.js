const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, teacherCheck } = require("../middlewares/auth");

// controllers
const { upload, remove } = require("../controllers/cloudinary");

router.post("/upload_file", authCheck, teacherCheck, upload);
router.post("/remove_file", authCheck, teacherCheck, remove);

module.exports = router;
