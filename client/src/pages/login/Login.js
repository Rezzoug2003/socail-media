import React, { useContext, useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const [username,setusername]=useState(null)
  const [password,setpassword]=useState(null)
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
               setusername(e.target.value)  ;
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value) ;
              }}
            />
            <Link to="/">
              <button
                onClick={() => {
                  login(username,password);
                }}
              >
                Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
