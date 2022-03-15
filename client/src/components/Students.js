import React, { useState } from 'react'
import './Students.css'

function Students() {
  const initialStates = { showLoginForm: true, first_name: "", last_name: "", email: "", password: "", role: "", isLoading: false }
  const [states, setStates] = useState(initialStates)
  const handleChange = (e, stateName) => setStates({ ...states, [stateName]: e.target ? e.target.value : e })

  return (
    <div className="student">
      <h3>Manage Students</h3>
      <h6>Add a new student:</h6>
      <form className="createStudent__form form-control addStudent__form">
        <input type="first_name" placeholder="First Name" onChange={(e) => handleChange(e, 'first_name')} />
        <input type="last_name" placeholder="Last Name" onChange={(e) => handleChange(e, 'last_name')} />
        <input type="email" placeholder="Email" onChange={(e) => handleChange(e, 'email')} />
        <input type="password" placeholder="Password" onChange={(e) => handleChange(e, 'password')} />
        <button type="submit" className="btn btn-primary btn-sm">Add student</button>
      </form>
    </div>
  )
}

export default Students