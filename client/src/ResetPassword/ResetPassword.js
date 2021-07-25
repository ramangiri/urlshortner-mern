import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";


const ResetPassword = (props) => {
  const history = useHistory();
  const [newPass, setNewPass] = useState("");
  let url = "https://rg-url-shortener-server.herokuapp.com";
  const resetLink = props.match.params.token;

  const handleClick = () => {
    if (newPass !== "") {
      try {
        axios
          .put(`${url}/user/reset-password`, { newPass, resetLink })
          .then((response) => {
            if (response.data.message) {
              alert(response.data.message);
              history.push("/");
            } else {
              alert(response.data.error);
              setNewPass("");
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter password");
    }
  };
  return (
   
    <div className="card card__">
    <span className="title">Enter New Password</span>
    <div className="forgot-img">
      <img
        src="https://c4.wallpaperflare.com/wallpaper/511/634/485/metal-code-password-combination-lock-wallpaper-preview.jpg"
        className="card-img-top real-img"
        alt="forgotpassword-img"
      />
    </div>
        <div className="form-group">
        <div className="text-success">
        Type your New password
      </div>
          <input
            type="password"
            className="form-control"
            id="pass"
            placeholder="Password"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success my-2"
          onClick={handleClick}
        >
          Reset
        </button>
        <Link to={"/"} className="link">Signin</Link>
      </div>
    
  );
};

export default ResetPassword;
