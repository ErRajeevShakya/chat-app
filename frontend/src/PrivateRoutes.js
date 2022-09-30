import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import ResetPassword from "./components/resetPassword/ResetPassword";
import SignUp from "./components/signUp/SignUp";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/home" element={<Homepage />} />

        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default PrivateRoute;
