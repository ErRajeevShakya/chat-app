import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const signup = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios.post("http://localhost:5000/signup", user).then((res) => {
        alert(res.data.message);
        navigate("/login");
      });
    } else {
      alert("invalid input");
    }
  };

  return (
    <div className="signup">
      {console.log("User", user)}
      <h1>SignUp</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
      />

      <div className="button" onClick={signup}>
        Signup
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>
        Login
      </div>
    </div>
  );
};

export default SignUp;
