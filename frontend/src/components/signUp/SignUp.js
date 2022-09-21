import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fname: "",
    lname: "",
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
    console.log(user);
    const { fname, lname, email, password, reEnterPassword } = user;
    if (fname && lname && email && password && password === reEnterPassword) {
      axios.post("http://localhost:5000/signup", user).then((res) => {
        alert(res.data.message);
        console.log(res.data.message);
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
        name="fname"
        value={user.fname}
        placeholder="first Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="lname"
        value={user.lname}
        placeholder="last Name"
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
