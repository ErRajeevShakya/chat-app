import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies("token");

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
  useEffect(() => {}, []);

  // useEffect(() => {
  //   axios.post("http://localhost:5000/login", user).then((res) => {
  //     setLoginUser(res.data.user);
  //     settoken(res.data);
  //   });
  // }, []);

  // const login = () => {
  //   if (user.email !== "" && user.password !== "") {
  //     alert(tokendata.message);
  //     console.log(tokendata.token);
  //     setCookie("token", tokendata.token, {
  //       path: "/",
  //       maxAge: 10 * 60,
  //     });

  //     navigate("/");
  //   } else {
  //     alert("please input details");
  //   }
  // };

  const login = () => {
    if (user.email !== "" && user.password !== "") {
      axios.post("http://localhost:5000/login", user).then((res) => {
        alert(res.data.message);
        console.log(res.data.token);
        setCookie("token", res.data.token, {
          path: "/",
          maxAge: 10 * 60,
        });
        setLoginUser(res.data.user);
        navigate("/");
      });
    } else {
      alert("please input details");
    }
  };
  console.log(cookies.token);

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
