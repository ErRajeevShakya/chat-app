import React from "react";
import "./App.css";

import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import SignUp from "./components/signUp/SignUp";
import ResetPassword from "./components/resetPassword/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

// const Homepage = React.lazy(() => import("./components/homepage/homepage"));
function App() {
  const [cookies] = useCookies("token");
  const [user, setLoginUser] = useState({});
  console.log(cookies);

  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              cookies && cookies ? (
                <Homepage user={user} />
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
                <ResetPassword email={user.email} />
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
