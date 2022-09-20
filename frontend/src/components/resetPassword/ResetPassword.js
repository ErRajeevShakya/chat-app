import React, { useState } from "react";
import "./ResetPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ResetPassword = ({ email }) => {
  console.log(email);
  const navigate = useNavigate();
  const [passwords, setPassword] = useState({
    old: "",
    newP: "",
    conf: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...passwords,
      [name]: value,
    });
  };
  const changePassword = () => {
    const { old, newP, conf } = passwords;
    if (old && newP === conf) {
      axios
        .post(`http://localhost:5000/resetpassword/${email}`, passwords)
        .then((res) => {
          alert(res.data);
          navigate("/login");
        });
    } else {
      alert("invalid input");
    }
  };
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
        Reset password
      </div>
    </div>
  );
};

export default ResetPassword;
