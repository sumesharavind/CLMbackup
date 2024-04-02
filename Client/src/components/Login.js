import React, { useState } from "react";
import axios from "axios";
import { Link, json, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LoginImage from "./images/logoimage.jpg";
import { useGlobalContext } from "./GlobalContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { state, updateUserID, updateUserName, updateUserEmail } =
    useGlobalContext();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      const decoded = jwt_decode(response.data.accessToken);
      console.log(JSON.stringify(decoded));
      updateUserName(decoded.name);
      updateUserEmail(decoded.email);
      updateUserID(decoded.userId);

      navigate("/home");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img src={LoginImage} alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <div className="login-form">
          <h2>Sign In</h2>
          <form action="" onSubmit={Auth}>
            <p className="">{msg}</p>
            <div className="form-group">
              <label className="lab" htmlFor="username">
                E-Mail:
              </label>
              <input
                type="text"
                className="inputfeild"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="lab" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                className="inputfeild"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input type="checkbox" /> Keep me signed in
            </div>
            <button className="loginbutton" type="submit">
              Log In
            </button>
            <div className="loglink">
              {/*<a className="cannotlink" href="#">Can't Access your Account?</a>*/}
            </div>
            <Link
              to="/register"
              className="btn btn-default border w-100 bg-success text-white text-decoration-none"
            >
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
