import React, { useEffect } from "react";
import "./App.css";

import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import SignUp from "./components/signUp/SignUp";
import ResetPassword from "./components/resetPassword/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const token = localStorage.getItem("token");

  // const handleRoute = () => {
  //   if (!token) {
  //     return (
  //       <>
  //         <Route path="/" element={<Login />} />
  //         <Route path="/signup" element={<SignUp />} />
  //       </>
  //     );
  //   }
  //   return (
  //     <>
  //       <Route path="/home" element={<Homepage />} />

  //       <Route path="/resetpassword" element={<ResetPassword />} />
  //     </>
  //   );
  // };

  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path="/" element={token ? <Homepage /> : <Login />} />

          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/resetpassword"
            element={token ? <ResetPassword /> : <Login />}
          />

          {/* {handleRoute()} */}
        </Routes>
        {/* <PrivateRoute /> */}
      </Router>
    </div>
  );
}

export default App;
