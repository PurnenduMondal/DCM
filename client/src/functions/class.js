import axios from "axios";

export const createClass = async (class_info, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/class`, class_info, {
    headers: {
      authtoken,
    },
  });

export const createTopic = async (topicData, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/class/topic`, topicData, {
    headers: {
      authtoken,
    },
  });

export const uploadFile = async (topicData, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/upload_file`, topicData, {
    headers: {
      authtoken,
    },
  });

export const deleteFile = async (topicData, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/delete_file`, topicData, {
    headers: {
      authtoken,
    },
  });

export const getClass = async (userId) =>
  await axios.get(`${process.env.REACT_APP_API}/class/${userId}`)

export const getClassById = async (classId) =>
  await axios.get(`${process.env.REACT_APP_API}/class_by_id/${classId}`)

export const registerStudent = async (studentData, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/register_student`, studentData, {
    headers: {
      authtoken,
    },
  })

export const getAllStudents = async (classId, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/get_all_students`, {classId}, {
    headers: {
      authtoken,
    },
  })

export const getStudentsByClassId = async (classId, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/get_students_by_class_id/${classId}`, {}, {
    headers: {
      authtoken,
    },
  })

export const addStudentToAClass = async (email, classId, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/add_students_to_a_class`, { email, classId }, {
    headers: {
      authtoken,
    },
  })

export const removeStudentFromAClass = async (email, classId, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/remove_students_from_a_class`,  { email, classId }, {
    headers: {
      authtoken,
    },
  })