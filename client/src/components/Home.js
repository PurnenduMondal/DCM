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
  const [classes, setClasses] = useState([])
  const [currentClassIndex, setCurrentClassIndex] = useState(0)
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)

  useEffect(() => {
    if (!user) navigate("/")
  }, [user])
  

  useEffect(() => {
    getClass(user._id).then(res => {
      setClasses(res.data);
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
        setClasses([...classes, res.data])
      })
    } else {
      createTopic({ name: topic, classId: s }, idToken).then((res) => {
        getClass(user._id).then(res => setClasses(res.data))
      })
    }

  }

  const handleClassChange = (i) => {
    setCurrentClassIndex(i)
    setCurrentTopicIndex(0)
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
              {classes.map((classData, i) =>
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
                      {classData.topics.map((topic, j) =>
                          <li key={j}>
                            <button onClick={() => {setCurrentTopicIndex(j)}} className="btn btn-sm">{topic.name}</button>
                          </li>
                        )}
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </Accordion>
          </div>
        </div>
        <div className="main-content">
          {
            showStudents ?
              <Students />
              :
              <Topic
                props={[classes, currentClassIndex, currentTopicIndex]} />
          }
        </div>
      </div>
    </div>
  )
}

export default Home