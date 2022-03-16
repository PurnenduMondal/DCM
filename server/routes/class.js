const express = require("express")
const router = express.Router()

// middlewares
const { authCheck, teacherCheck } = require("./../middlewares/auth")

// controller
const { create, findOne, createTopic } = require("./../controllers/class")

router.post("/class", authCheck, teacherCheck, create)
router.get('/class/:userId', findOne)
router.post('/class/topic', authCheck, teacherCheck, createTopic)

module.exports = router