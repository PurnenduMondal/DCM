const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, teacherCheck } = require("./../middlewares/auth");

// controller
const { create, findOne } = require("./../controllers/class");

router.post("/class", authCheck, teacherCheck, create);
router.get('/class/:id', findOne);

module.exports = router;