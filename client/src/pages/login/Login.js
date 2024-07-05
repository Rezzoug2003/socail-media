import React, { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export const Login = () => {
  const navigate = useNavigate()
   const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  })
  const handlechange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const handleclick = async(e) => {
    e.preventDefault();
    try {
      await login(user);
      navigate("/")

    } catch (err) {
      setErr(err.response.data);
    }
   }
  console.log(user)
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
              name="username"
              onChange={handlechange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handlechange}
            />
            {err&&err}
          
              <button
                onClick={handleclick}>
                Login
              </button>
           
          </form>
        </div>
      </div>
    </div>
  );
};
