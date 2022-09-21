import React, { useState } from "react";
import "./ResetPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
const ResetPassword = ({ email }) => {
  console.log(email);
  const navigate = useNavigate();
  const [passwords, setPassword] = useState({
    old: "",
    newP: "",
    conf: "",
  });

  const [cookies, setCookie] = useCookies("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...passwords,
      [name]: value,
    });
  };

  // let config = {
  //   headers: {
  //     'Authorization': 'Bearer ' + validToken()
  //   }
  // }
  // Axios.post(
  //     'http://localhost:8000/api/v1/get_token_payloads',
  //     config
  //   )
  //   .then( ( response ) => {
  //     console.log( response )
  //   } )
  //   .catch()
  console.log(cookies.token);

  const changePassword = () => {
    const { old, newP, conf } = passwords;
    if (old && newP === conf) {
      axios
        .post(`http://localhost:5000/resetpassword/${email}`, passwords, {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        })
        .then((res) => {
          alert(res.data);
        });
      navigate("/home");
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
        change password
      </div>
      <div
        className="button"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </div>
    </div>
  );
};

export default ResetPassword;
