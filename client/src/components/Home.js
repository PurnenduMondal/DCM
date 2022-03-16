import React, { lazy, useEffect, useState } from 'react'
import { auth } from "./../functions/firebase"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { getClass, createClass, createTopic } from "./../functions/class"
import { Accordion } from 'react-bootstrap';
import "./Home.css"

const Topic = lazy(() => import("./Topic.js"))
const Students = lazy(() => import("./Students.js"))
function Home() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ ...state }));
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [showStudents, setShowStudents] = useState(false)
  const [classes, setClasses] = useState(null)
  const [currentClass, setCurrentClass] = useState(null)
  const [currentTopic, setCurrentTopic] = useState(null)

  useEffect(() => {
    if (!user) navigate("/")
  }, [user])
  

  useEffect(() => {
    getClass(user._id).then(res => {
      setClasses(res.data);
      setCurrentClass(res.data[0])
      setCurrentTopic(res.data[0].topics[0])
    });
  }, []);

  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null
    })
  }

  const handleSubmit = async (e, s) => {
    e.preventDefault()
    const idToken = await auth.currentUser.getIdToken();
    if (s === "Create Class") {

      createClass({ subject: subject }, idToken).then((res) => {
        console.log(res.data)
      })
    } else {
      createTopic({ name: topic, classId: s }, idToken).then((res) => {
        setCurrentTopic(res.data.topics[res.data.topics.length - 1])
      })
    }

  }

  const handleClassChange = (i) => {
    setCurrentClass(classes[i])
    setCurrentTopic(classes[i].topics[0])
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
            <form onSubmit={(e) => handleSubmit(e, 'Create Class')} className="sidebar__form">
              <input type="text" placeholder="Enter a new class subject" onChange={(e) => setSubject(e.target.value)} />
              <button type="submit" className="btn btn-primary btn-sm">Create Class</button>
            </form> : <></>)
            : <></>}
          <div className="sidebar__contains">
            <Accordion>
              {classes !== null ? classes.map((classData, i) =>
                <Accordion.Item eventKey={i} key={i}>
                  <Accordion.Header onClick={() => handleClassChange(i)}>
                    {classData.subject} by {classData.teacher.first_name + " " + classData.teacher.last_name}
                  </Accordion.Header>
                  <Accordion.Body>
                    <form onSubmit={(e) => handleSubmit(e, classData._id)} className="sidebar__form">
                      <input type="text" placeholder='Enter a new topic' onChange={(e) => setTopic(e.target.value)} />
                      <button type="submit" className="btn btn-primary btn-sm">Create Topic</button>
                    </form>
                    <ol>
                      {
                        classData.topics !== [] ? classData.topics.map((topic, i) =>
                          <li key={i}>
                            <button onClick={() => setCurrentTopic(topic)} className="btn btn-sm">{topic.name}</button>
                          </li>
                        ) : <></>
                      }
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
              ) : <></>}
            </Accordion>
          </div>
        </div>
        <div className="main-content">
          {
            showStudents ?
              <Students
                currentClass={currentClass} />
              :
              <Topic
                props={[user, currentClass, currentTopic]}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default Home