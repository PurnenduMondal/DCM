const express = require("express")
const router = express.Router()

// middlewares
const { authCheck, teacherCheck } = require("./../middlewares/auth")

// controller
const { create, findOne, findOneById, createTopic } = require("./../controllers/class")

router.post("/class", authCheck, teacherCheck, create)
router.get('/class/:userId', findOne)
router.get('/class_by_id/:classId', findOneById)
router.post('/class/topic', authCheck, teacherCheck, createTopic)

module.exports = router