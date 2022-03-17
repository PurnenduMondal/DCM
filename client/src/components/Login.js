import React, { useEffect, useState } from 'react'
import { auth } from "./../functions/firebase"
import { useSelector, useDispatch } from "react-redux"
import { createOrUpdateUser, currentUser } from "../functions/auth"
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {


  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialStates = { showLoginForm: true, first_name: "", last_name: "", email: "", password: "", role: "Teacher", isLoading: false }
  const [states, setStates] = useState(initialStates)
  const handleChange = (e, stateName) => setStates({ ...states, [stateName]: e.target ? e.target.value : e })


  useEffect(() => {

    if (user) navigate("/home")
    return () => {
      setStates({})
    };
  }, [user])

  const signIn = async (e) => {
    e.preventDefault()
    setStates({ ...states, isLoading: true })

    await auth.signInWithEmailAndPassword(states.email, states.password)
    const idToken = await auth.currentUser.getIdToken();
    currentUser(idToken)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        })
        handleChange(false, "isLoading")
        if (res.data.role !== null) navigate("/home")
      })
  }

  const register = async (e) => {
    e.preventDefault()
    handleChange(true, "isLoading")

    try {

      await auth.createUserWithEmailAndPassword(states.email, states.password)
      const idToken = await auth.currentUser.getIdToken();
      createOrUpdateUser(idToken, states)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: res.data,
          })
        })
      handleChange(false, "isLoading")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
      <h1>{states.showLoginForm ? "Login" : "Teacher Registration" }</h1>
      <div>


        <form className="form-control login__form">
          {
            !states.showLoginForm ?
              <>
                <input className="form-control" type="first_name" placeholder="First Name" onChange={(e) => handleChange(e, 'first_name')} />
                <input className="form-control" type="last_name" placeholder="Last Name" onChange={(e) => handleChange(e, 'last_name')} />
              </> : ""
          }
          <select className="form-control" onChange={(e) => handleChange(e, 'role')}>
            <option value="Teacher">Teacher</option> 
            {states.showLoginForm ? <option value="Student">Student</option> : ""}
          </select>
          <input className="form-control" type="email" placeholder="Email" onChange={(e) => handleChange(e, 'email')} />
          <input className="form-control" type="password" placeholder="Password" onChange={(e) => handleChange(e, 'password')} />
          <button className="form-control btn-primary" onClick={states.showLoginForm ? signIn : register}>{states.showLoginForm ? "Login" : "Register"}</button>
        </form>

        <a className="" onClick={() => handleChange(!states.showLoginForm, "showLoginForm")}>
          Show {states.showLoginForm ? "Registration" : "Login"} Form
        </a>
      </div>
    </div>
  )
}

export default Login