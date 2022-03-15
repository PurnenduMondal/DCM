import React, { lazy, useEffect, useState } from 'react'
import { auth } from "./../functions/firebase"
import { createClass } from "./../functions/class"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css"

const Topic = lazy(() => import("./Topic.js"))
const Students = lazy(() => import("./Students.js"))
function Home() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ ...state }));
  const [subject, setSubject] = useState("")
  const [showStudents, setShowStudents] = useState(false)

  useEffect(() => {
    if (!user) navigate("/")
  }, [user])

  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const idToken = await auth.currentUser.getIdToken();
    createClass({ subject: subject }, idToken).then((res) => {
      console.log(res)
    })
  }
  return (
    <div className="home">
      <header>
        <button className="btn btn-primary student" onClick={() => setShowStudents(!showStudents)}>
          Manage {showStudents ? 'Topics' : 'Students'}
        </button>
        <h2>Welcome: {user ? user.first_name + " " + user.last_name : ""}</h2>
        <button className="btn btn-danger logout" onClick={logout}>Logout</button>
      </header>
      <div className="home-content">
        <div className="sidebar">
          <h5>Your Classes:</h5>
          {user ? (user.role === "Teacher" ?
            <form onSubmit={handleSubmit} className="sidebar__form">
              <input type="text" placeholder="Enter a new class subject" onChange={(e) => setSubject(e.target.value)} />
              <button type="submit" className="btn btn-primary btn-sm">Create Class</button>
            </form> : <></>)
            : <></>}
          <div className="sidebar__contains">
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button className="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    Computer Science by Purnendu Mondal
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                  <div className="accordion-body">
                    <form className="sidebar__form">
                      <input type="text" placeholder='Enter a new topic' />
                      <button type="submit" className="btn btn-primary btn-sm">Create Topic</button>
                    </form>
                    <ol>
                      <li>Object Oriented Programming</li>
                      <li>Data Structures</li>
                      <li>Algorithms</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content">
          {
            showStudents ? <Students /> : <Topic />
          }
        </div>
      </div>
    </div>
  )
}

export default Home