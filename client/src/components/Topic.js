import React, { useEffect, useState } from 'react'
import { auth } from '../functions/firebase'
import { uploadFile, deleteFile, getClassById } from "./../functions/class"
import "./Topic.css"

function Topic({ props }) {

  const [video, setVideo] = useState(null)
  const [pdf, setPDF] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentClass, setCurrentClass] = useState(null)
  const [currentTopic, setCurrentTopic] = useState(null)

  useEffect(() => {
    if (props[0].length > 0) {
      getClassById(props[0][props[1]]._id).then(res => {
        setCurrentClass(res.data)
        setCurrentTopic(res.data.topics[props[2]])
      })
    }
  }, [props])

  const renderLoader = () => (
    <div className="spinner-container">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );

  const handleInputChange = (e) => {

    if (e.target.files[0]) {
      let file = e.target.files[0]
      let contentType = e.target.name
      let reader = new FileReader();
      reader.onload = (e) => {
        if (contentType === "video") {
          setVideo(e.target.result);
        }
        else {
          setPDF(e.target.result);
        }

      };
      reader.readAsDataURL(file);
    }
  }


  const handleSubmit = async (e, contentType) => {
    e.preventDefault()
    //setIsLoading(true)
    let topicId = currentTopic._id
    let content = null
    if (contentType === "video") {
      content = { topicId: topicId, contentType: contentType, content: video }
    } else {
      content = { topicId: topicId, content: pdf }
    }
    let idToken = await auth.currentUser.getIdToken();
    uploadFile(content, idToken)
      .then((res) => {
        getClassById(props[0][props[1]]._id).then(res => {
          setCurrentClass(res.data)
          setCurrentTopic(res.data.topics[props[2]])
        })
      })
      .catch(err => console.log(err))
  }

  const handleDelete = async (contentType) => {
    let topicId = currentTopic._id
    let content = { topicId: topicId, contentType: contentType }
    let idToken = await auth.currentUser.getIdToken();
    deleteFile(content, idToken)
      .then((res) => {
        getClassById(props[0][props[1]]._id).then(res => {
          setCurrentClass(res.data)
          setCurrentTopic(res.data.topics[props[2]])
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="topic">
      <div>
        <h4>
          Class: {currentClass ? currentClass.subject : ''} by {currentClass ? currentClass.teacher.first_name + " " + currentClass.teacher.last_name : ''}
        </h4>
        <h5>Topic: {currentTopic ? currentTopic.name : ''}</h5>
        <h6>Video Lecture:</h6>
      </div>
      {currentTopic ? (currentTopic.video_url === null ?
        <form onSubmit={(e) => handleSubmit(e, "video")} className="topic__form">
          <label htmlFor="">Add/Change video lecture: &emsp;</label>
          <input onChange={handleInputChange} type="file" name="video" accept="video/*" required />
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
        :
        <div className="video">
          <video controls>
            <source src={currentTopic.video_url} type='video/webm' />
          </video>
          <button onClick={() => handleDelete("video")} className="btn btn-danger btn-sm my-2">Delete video</button>
        </div>
      ) : <></>}
      <div>
        <h6>Study Material: </h6>
        {currentTopic ? (currentTopic.note !== null ?
          <div className="topic__note">
            <a href={currentTopic.note} download={currentTopic.name + " by " + currentClass.teacher.first_name + " " + currentClass.teacher.last_name}>
              {currentTopic.name + " by " + currentClass.teacher.first_name + " " + currentClass.teacher.last_name}
            </a>
            <button onClick={() => handleDelete("note")} className="btn btn-danger btn-sm my-2">Delete note</button>
          </div>
          :
          <form onSubmit={(e) => handleSubmit(e, 'note')} className="topic__form">
            <label htmlFor="">Add/Change lecture note: &emsp;</label>
            <input onChange={handleInputChange} type="file" name="note" accept="application/pdf" required />
            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
          </form>
        ) : <></>}
      </div>
    </div>
  )
}

export default Topic