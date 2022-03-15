import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getClass } from "./../functions/class"

function Class() {
  const { user } = useSelector((state) => ({ ...state }))
  const [classData, setClassData] = useState({})
  const navigate = useNavigate()
  const id = useParams().id;

  useEffect(() => {
    getClass(id).then(res => setClassData(res.data));
  }, []);

  useEffect(() => {
    if (!user) navigate("/")
  }, [user])

  return (
    <>
      <header>
        <h3>Welcome to The {classData.subject} Classes by {classData.teacher ? classData.teacher.first_name+" "+classData.teacher.last_name : ""}</h3>
      </header>
      <div>
        <button><Link to={"/home/class/topic/"+classData._id}>Add a new topic</Link></button>
        <button><Link to={"/home/class/students/"+classData._id}>Manage Students</Link></button>
        <h4>Topics:</h4>
        <ol>
          <li><Link to="/topic">Object Oriented Programming</Link></li>
          <li><Link to="/topic">Data Structures</Link></li>
          <li><Link to="/topic">Algorithms</Link></li>
        </ol>
      </div>
    </>
  )
}

export default Class