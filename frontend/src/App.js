import React from "react";
import "./App.css";

import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import SignUp from "./components/signUp/SignUp";
import ResetPassword from "./components/resetPassword/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// const Homepage = React.lazy(() => import("./components/homepage/homepage"));
function App() {
  const [user, setLoginUser] = useState({});
  const [use, setuse] = useState("");
  console.log(use);
  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Homepage user={user} setLoginUser={setuse} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/resetpassword"
            element={
              user && user._id ? (
                <ResetPassword email={user.email} setLoginUser={setuse} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
