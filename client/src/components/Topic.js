import React from 'react'
import "./Topic.css"
function Topic() {
  return (
    <div className="topic">
      <div>
        <h4>Class: Computer Science by Purnendu Mondal</h4>
        <h5>Topic: Object Oriented Programming</h5>

        <form className="topic__form">
            <label htmlFor="">Add/Change video lecture: &emsp;</label>
            <input type="file" name="video" />
            <button type="submit"  className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      <div className="video">
        <video controls>
          <source src="http://techslides.com/demos/sample-videos/small.webm" type="video/webm" />
          <source src="http://techslides.com/demos/sample-videos/small.ogv" type="video/ogg" />
          <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4" />
          <source src="http://techslides.com/demos/sample-videos/small.3gp" type="video/3gp" />
        </video>
      </div>

      <div>
        <form className="topic__form">
          <label htmlFor="">Add/Change lecture note: &emsp;</label>
          <input type="file" name="note" />
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
        <h6>Study Material: <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">OOP</a></h6>

      </div>
    </div>
  )
}

export default Topic