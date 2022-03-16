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

