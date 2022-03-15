import React, { useEffect, lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { auth } from "./functions/firebase"
import { currentUser } from "./functions/auth"


const Login = lazy(() => import("./components/Login.js"))
const Home = lazy(() => import("./components/Home.js"))
const Class = lazy(() => import("./components/Class.js"))
const Students = lazy(() => import("./components/Students.js"))


const renderLoader = () => (
  <div className="spinner-container">
    <div className="spinner-border text-info" role="status">
      <span className="sr-only"></span>
    </div>
  </div>
);

function App() {
  
  const dispatch = useDispatch()
  // to check firebase auth state
  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        currentUser(token)
        .then((res) => {
          dispatch({
              type: "LOGGED_IN_USER",
              payload: res.data
          })
        }) 
      }

    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={renderLoader()}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />        
      </Routes>
    </Suspense>
  );
}

export default App;
