import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
// import PageNotFound from "./pages/PageNotFound";
import Mypost from "./pages/Mypost";
import Homepost from "./pages/Homepost";
import Mypoemscomment from "./pages/Mypoemscomment";
const App = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  // * Log out function
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="">
              {!authState.status ? (
                <>
                  <div className="">
                    <Link to="/login">Login</Link>
                    <Link to="/registration">Registration</Link>
                    <Link to="/">Home Page</Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="loginwholecontainer">
                    <div className="navloginleft">
                      <Link className="navcreatepost" to="createpost">
                        Create a Poem
                      </Link>
                      
                      <Link className="navhome" to="/mypost">
                        My Poems
                      </Link>
                      <Link className="navhome" to="/home">
                        Public Poems
                      </Link>
                    </div>
                    <div className="navloginright">
                      <h1 className="navusername">{authState.username}</h1>
                      <button className="navbutton" onClick={logout}>
                        Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" exact element={<Homepost/>} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
            {/* <Route path="/registration" exact element={<Registration />} /> */}
            <Route path="/mypost" exact element={<Mypost />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/mypost/:id" exact element={<Mypoemscomment />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
