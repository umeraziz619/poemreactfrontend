import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  let navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const data = { username: username, password: password };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth", { username, password })
      .then((response) => {
        console.log(response);
        alert("Registration successfully");
        navigate("/login");
      });
  };
  return (
    //   <div className='createPostPage' >
    //   <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
    //   {/* id='inputCreatePost' name='title' placeholder='e.g Umer' */}
    //     <Form className='formContainer'>

    //       <label>Username:</label>
    //       <ErrorMessage name='username' component='span' />
    //     <Field id='inputCreatePost' name='username' placeholder='e.g alonehacker' autoComplete="off" />
    //       <label>Password:</label>
    //       <ErrorMessage name='username' component='span' />
    //     <Field id='inputCreatePost' type='password' name='password' placeholder='enter password' autoComplete="off" />

    //     <button type='submit' >Registor</button>

    //     </Form>
    //   </Formik>
    // </div>
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          {/* <img src="../img/img-login.svg" alt="" /> */}
        </div>

        <div className="login__forms">
          <div className="login__registre" id="login-in">
            <h1 className="login__title">Sign Up</h1>

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
              <span className="login__account">Already Have account?</span>
              <span className="login__signin" id="sign-up" onClick={()=>navigate('/login')}>
                Login Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
