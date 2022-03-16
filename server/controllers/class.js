const Class = require("../models/class")
const Topic = require("../models/topic")
const User = require("../models/user")

exports.create = async (req, res) => {
  const { subject } = req.body

  const teacher  = await User.findOne({ email: req.user.email }).exec()
  const newClass = await new Class({ subject, teacher }).save()
  teacher.classes.push(newClass)
  await teacher.save()
  
  res.json(newClass)
}

exports.createTopic = async (req, res) => {
  const { name, classId } = req.body

  const classDoc = await Class.findById(classId).exec()
  const newTopic = await new Topic({ name: name, class: classDoc }).save()
  classDoc.topics.push(newTopic)
  await classDoc.save()
  res.json(classDoc)
}

exports.findOne = async (req, res) => {
  let userId = req.params.userId
  let user =  await User.findById(userId).populate({
    path: 'classes',
    populate: {
      path: 'teacher topics',
    }
  }).exec()
  res.json(user.classes)
}

exports.findOneById = async (req, res) => {
  let classId = req.params.classId
  let classData =  await Class.findById(classId).populate('teacher topics').exec()
  res.json(classData)
}