const Class = require("../models/class")
const Topic = require("../models/topic")
const User = require("../models/user")
const admin = require("../firebase");

exports.create = async (req, res) => {
  const { subject } = req.body

  const teacher = await User.findOne({ email: req.user.email }).exec()
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
  let user = await User.findById(userId).populate({
    path: 'classes',
    populate: {
      path: 'teacher topics',
    }
  }).exec()
  res.json(user.classes)
}

exports.findOneById = async (req, res) => {
  const classId = req.params.classId
  const classData = await Class.findById(classId).populate('teacher topics').exec()
  res.json(classData)
}

exports.registerStudent = async (req, res) => {
  const { classId, first_name, last_name, email, role, password } = req.body;
  const classData = await Class.findById(classId).exec()

  admin.auth().createUser({
    email: email,
    emailVerified: false,
    password: password,
    displayName: first_name + " " + last_name,
    disabled: false,
  }).then(function (userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
    .catch(function (error) {
      console.log("Error creating new user:", error);
    });
  const newStudentUser = await new User({
    first_name,
    last_name,
    email,
    classes: [classData],
    role,
  }).save();

  //console.log("USER CREATED", newUser);
  res.json(newStudentUser)
}

exports.getAllStudents = async (req, res) => {
  const classId = req.body.classId
  const students = await User.find({ role: "Student", classes: { "$nin": [classId] } }).exec()
  res.json(students)
}

exports.getStudentsByClassId = async (req, res) => {
  const classId = req.params.classId
  const students = await User.find({ role:"Student", classes: { "$in": [classId] } })
  .populate({
    path: 'classes',
    populate: {
      path: 'teacher',
    }
  }).exec()

  res.json(students)
}

exports.addStudentToAClass = async (req, res) => {
  const email = req.body.email
  const classId = req.body.classId
  const classDoc = await Class.findById(classId).exec()
  const student = await User.updateOne(
    { email }, {
    $push: {
      classes: [classDoc],
    },
  })
  res.json(student)
}

exports.removeStudentFromAClass = async (req, res) => {
  const email = req.body.email
  const classId = req.body.classId
  const classDoc = await Class.findById(classId).exec()
  const student = await User.updateOne(
    { email }, {
    $pullAll: {
      classes: [classDoc],
    },
  });

  res.json(student)
}
