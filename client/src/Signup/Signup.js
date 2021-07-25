import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let url = "https://rg-url-shortener-server.herokuapp.com";

  const handleClick = async () => {
    if (name !== "" && email !== "" && password !== "") {
      try {
        await axios
          .post(`${url}/user/signup`,{ name, email, password })
          .then((response) => {
            if (response.data.message) {
              alert(response.data.message);
              history.push("/");
            } else {
              alert(response.data.error);
            }
          });
        setName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill all the details");
    }
  };
  return (
    <div className="card card__">
    
      <p className="title">Sign-up</p>
      <div className="welcome-img">
        <img
          src="https://images.pexels.com/photos/3643925/pexels-photo-3643925.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          className="card-img-top real-img"
          alt="login-img"
        />
        </div>

      
        <div className="form-group">
        <label htmlFor="inputFullName">Full Name</label>
          <input
            type="name"
            className="form-control my-2"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control my-2"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="pass"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-success my-2"
          
          onClick={handleClick}
        >
          Sign Up
        </button>
        <Link to={"/"} className="link">Signin</Link>
      </div>
  
    
  );
};

export default Signup;
