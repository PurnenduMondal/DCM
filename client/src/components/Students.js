import React, { useEffect, useState } from 'react'
import {
  registerStudent,
  getAllStudents,
  getStudentsByClassId,
  addStudentToAClass,
  removeStudentFromAClass
} from "./../functions/class"
import { auth } from "./../functions/firebase"
import './Students.css'
import { Spinner } from 'react-bootstrap';

function Students({ props }) {
  const initialStates = { first_name: "", last_name: "", email: "", password: "", role: "Student", }
  const [states, setStates] = useState(initialStates)
  const [classId, setClassId] = useState("")
  const [students, setStudents] = useState([])
  const [unenrolledStudents, setUnenrolledStudents] = useState([])
  const [unenrolledStudentEmail, setUnenrolledStudentEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (props[0].length > 0) {
      setClassId(props[0][props[1]]._id)
      auth.currentUser.getIdToken().then(idToken => {
        getStudentsByClassId(props[0][props[1]]._id, idToken).then(res => {
          setStudents(res.data)
        })
        getAllStudents(props[0][props[1]]._id, idToken).then(res => {
          setUnenrolledStudents(res.data)
        })
      })
    }
  }, [props])

  const handleChange = (e, stateName) =>
    setStates({ ...states, [stateName]: e.target.value })

  const register = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const idToken = await auth.currentUser.getIdToken();
    registerStudent({ ...states, classId: classId }, idToken).then(res => {
      getStudentsByClassId(props[0][props[1]]._id, idToken).then(res => {
        setStudents(res.data)
      })
      setIsLoading(false)
    })
  }

  const addStudent = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const idToken = await auth.currentUser.getIdToken();
    addStudentToAClass(unenrolledStudentEmail, props[0][props[1]]._id, idToken).then(res => {
      getStudentsByClassId(props[0][props[1]]._id, idToken).then(res => {
        setStudents(res.data)
      })
      getAllStudents(props[0][props[1]]._id, idToken).then(res => {
        setUnenrolledStudents(res.data)
      })
      setIsLoading(false)
    })
  }

  const removeStudent = async (email) => {
    setIsLoading(true)
    const idToken = await auth.currentUser.getIdToken();
    console.log(email)
    removeStudentFromAClass(email, props[0][props[1]]._id, idToken).then(res => {
      getStudentsByClassId(props[0][props[1]]._id, idToken).then(res => {
        setStudents(res.data)
      })
      getAllStudents(props[0][props[1]]._id, idToken).then(res => {
        setUnenrolledStudents(res.data)
      })
      setIsLoading(false)
    })
  }

  return (
    <div className="student">
    {console.log(props[0][props[1]])}
      <h5>Class: {props[0].length > 0 ? props[0][props[1]].subject+" by "+props[0][props[1]].teacher.first_name+" "+props[0][props[1]].teacher.last_name :''}</h5>
      <h6>Add a new student:</h6>
      <form onSubmit={(e) => register(e)} className="createStudent__form form-control addStudent__form">
        <input type="first_name" placeholder="First Name" onChange={(e) => handleChange(e, 'first_name')} required />
        <input type="last_name" placeholder="Last Name" onChange={(e) => handleChange(e, 'last_name')} required />
        <input type="email" placeholder="Email" onChange={(e) => handleChange(e, 'email')} required />
        <input type="password" placeholder="Password" onChange={(e) => handleChange(e, 'password')} required />
        <button type="submit" className="btn btn-primary btn-sm">
        {!isLoading ? "Add student" : <Spinner animation="border" variant="light" size="sm"/>}
        </button>
      </form>

      <h6>Add an unenrolled student:</h6>
      <form  onSubmit={(e) => addStudent(e)} className="createStudent__form form-control addStudent__form">
        <select onChange={(e) => setUnenrolledStudentEmail(e.target.value)}>
          <option value="">Select a Student By Email</option>
          {unenrolledStudents.map((student, index) => <option key={index} value={student.email}>{student.email}</option>)} 
        </select>
        <button type="submit" className="btn btn-primary btn-sm">
        {!isLoading ? "Add student" : <Spinner animation="border" variant="light" size="sm"/>}
        </button>
      </form>

      {students.length > 0 ?
        <div className="student__list">
        <h6>Manage Students:</h6>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Remove From Class</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) =>
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button onClick={() => removeStudent(student.email)} className="btn btn-danger btn-sm">
                    {!isLoading ? "Remove" : <Spinner animation="border" variant="light" size="sm"/>}
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        : ''}

    </div>
  )
}

export default Students