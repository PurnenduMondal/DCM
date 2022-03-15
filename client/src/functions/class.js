import axios from "axios";

export const createClass = async (class_info, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/class`, class_info, {
    headers: {
      authtoken,
    },
  });

export const getClass = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/class/${_id}`)