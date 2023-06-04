import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const data = { username: username, password: password };
  const { setAuthState } = useContext(AuthContext);

  const onSubmit = async () => {
    console.log("onsubmit was cliced");
    await axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert("Invalid username and password");
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/home");
        }
      });
  };

  return (
 
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          <img src="assets/img/img-login.svg" alt="" />
        </div>

        <div className="login__forms">
          <div className="login__registre" id="login-in">
            <h1 className="login__title">Sign In</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="Username"
                className="login__input"
                name="username"
                id="inputCreatePost"
                onChange={(event) => {
                  setusername(event.target.value);
                }}
              />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input
                type="password"
                placeholder="Password"
                className="login__input"
                name="password"
                id="inputCreatePost"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              />
            </div>

            {/* <a href="#" className="login__button">Sign In</a> */}
            <button onClick={onSubmit} className="login__button">
              Submit
            </button>

            <div>
              <span className="login__account">Don't have an Account ?</span>
              <span className="login__signin" id="sign-up" onClick={()=>navigate('/registration')}>
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
