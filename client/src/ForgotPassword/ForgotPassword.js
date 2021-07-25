import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  let url = "https://rg-url-shortener-server.herokuapp.com";
  const handleClick = async () => {
    if (email !== "") {
      try {
        await axios
          .put(`${url}/user/forget-password`, { email })
          .then((response) => {
            if (response.data.message) {
              alert(response.data.message);
            } else {
              alert(response.data.error);
            }
          });
        setEmail("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter email ID");
    }
  };
  return (
    <div className="card card__">
    <span className="title">Forgot Password?</span>
    <div className="forgot-img">
      <img
        src="/imgs/key.jpg"
        className="card-img-top real-img"
        alt="forgotpassword-img"
      />
    </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className=" forgot-password-button btn"
          onClick={handleClick}
        >
          Submit
        </button>
       <Link to={"/"}className="link">Signin</Link >
      </div>
      
  );
};

export default ForgotPassword;
