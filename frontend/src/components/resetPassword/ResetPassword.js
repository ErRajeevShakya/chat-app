import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const email = useSelector((state) => state.user?.user?.email);
  console.log(email);
  const navigate = useNavigate();
  const [passwords, setPassword] = useState({
    old: "",
    newP: "",
    conf: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...passwords,
      [name]: value,
    });
  };

  console.log(token);

  const changePassword = () => {
    const { old, newP, conf } = passwords;
    if (old && newP === conf) {
      axios
        .post(`http://localhost:5000/resetpassword/${email}`, passwords, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          alert(res.data);
        });
      navigate("/");
    } else {
      alert("invalid input");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  return (
    <div className="change">
      <h1>Reset Password</h1>
      <input
        type="password"
        name="old"
        value={passwords.old}
        placeholder="Old Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="newP"
        value={passwords.newP}
        placeholder="New Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="conf"
        value={passwords.conf}
        placeholder="confirm Password"
        onChange={handleChange}
      />
      <div className="button" onClick={changePassword}>
        change password
      </div>
      <div
        className="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Login
      </div>
    </div>
  );
};

export default ResetPassword;
