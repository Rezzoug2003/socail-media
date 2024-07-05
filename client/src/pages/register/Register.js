import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";
export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    
  })
  const [err, seterr] = useState(null);
  const handlechange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    })
  }
  const handleclick = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", user)
    } catch (err) {
      seterr(err.response.data);
    }

  }
  console.log(err)
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handlechange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handlechange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handlechange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handlechange}
            />
            {err&&err}
            <button onClick={handleclick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
