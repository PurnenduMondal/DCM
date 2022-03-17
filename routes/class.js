const express = require("express")
const router = express.Router()

// middlewares
const { authCheck, teacherCheck } = require("./../middlewares/auth")

// controller
const { 
  create, 
  findOne, 
  findOneById, 
  createTopic, 
  registerStudent,
  getAllStudents, 
  getStudentsByClassId,
  addStudentToAClass,
  removeStudentFromAClass
} = require("./../controllers/class")

router.post("/class", authCheck, teacherCheck, create)
router.get('/class/:userId', findOne)
router.get('/class_by_id/:classId', findOneById)
router.post('/class/topic', authCheck, teacherCheck, createTopic)
router.post('/register_student', authCheck, teacherCheck, registerStudent)
router.post('/get_all_students', authCheck, teacherCheck, getAllStudents)
router.post('/get_students_by_class_id/:classId', authCheck, teacherCheck, getStudentsByClassId)
router.post('/add_students_to_a_class/', authCheck, teacherCheck, addStudentToAClass)
router.post('/remove_students_from_a_class/', authCheck, teacherCheck, removeStudentFromAClass)

module.exports = router