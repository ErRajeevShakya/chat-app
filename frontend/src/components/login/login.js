import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Login = ({ tokendata }) => {
  const token1 = localStorage.getItem("token");
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.user);
  console.log(token);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    if (user.email !== "" && user.password !== "") {
      axios.post("http://localhost:5000/login", user).then((res) => {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);

        navigate("/");

        window.location.reload();
      });
    } else {
      alert("please input details");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
        required
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />

      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/signup")}>
        Signup
      </div>
    </div>
  );
};

export default Login;
