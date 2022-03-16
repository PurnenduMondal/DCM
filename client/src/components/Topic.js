import React, { useEffect, useState } from 'react'
import { auth } from '../functions/firebase'
import { uploadFile } from "./../functions/class"
import "./Topic.css"

function Topic({ props }) {

  const [video, setVideo] = useState(null)
  const [pdf, setPDF] = useState(null)

  // useEffect(() => {
  //   console.log(pdf)
  // }, [pdf])

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

  // const handleDeleteProduct = async (productId, images) => {
  //   setIsDeleting(true)
  //   for await (const image of images) {
  //     deleteProductImage({ public_id: image.public_id }).then(res => console.log(res))
  //   }

  //   deleteProduct({ productId: productId }).then(res => {
  //     getAllProducts({}).then(res => {
  //       setProducts(res.data)
  //       setIsDeleting(false)
  //     })
  //   })
  // }

  const handleSubmit = async (e, contentType) => {
    e.preventDefault()
    //setIsLoading(true)
    let topicId = props[2]._id
    let content = null
    if(contentType === "video"){
      content = { topicId: topicId, contentType: contentType, content: video }
    } else {
      content = { topicId: topicId, content: pdf }
    }
    let idToken = await auth.currentUser.getIdToken();
    uploadFile(content, idToken)
      .then((res) => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="topic">
      <div>
        <h4>
          Class: {props[1] ? props[1].subject : ''} by {props[1] ? props[1].teacher.first_name + " " + props[1].teacher.last_name : ''}
        </h4>
        <h5>Topic: {props[2] ? props[2].name : ''}</h5>
        <h6>Video Lecture:</h6>
      </div>
      {props[2] ? (props[2].video_url === null ?
        <form onSubmit={(e) => handleSubmit(e, "video")} className="topic__form">
          <label htmlFor="">Add/Change video lecture: &emsp;</label>
          <input onChange={handleInputChange} type="file" name="video" accept="video/*" required />
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
        :
        <div className="video">
          <video controls>
            <source src={props[2].video_url} type='video/webm' />
          </video>
          <button className="btn btn-danger btn-sm my-2">Delete video</button>
        </div>
      ) : <></>}
      <div>
        <h6>Study Material: </h6>
        {props[2] ? (props[2].note !== null ?
          <div className="topic__note">
            <a href={props[2].note}>{props[2].name+" by "+ props[1].teacher.first_name + " " + props[1].teacher.last_name}</a>
            <button className="btn btn-danger btn-sm my-2">Delete note</button>
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