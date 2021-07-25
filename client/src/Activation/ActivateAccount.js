import React from "react";

import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const ActivateAccount = (props) => {
  const history = useHistory();
  let url = "https://rg-url-shortener-server.herokuapp.com";
  let activationLink = props.match.params.token;
  const handleClick = async () => {
    try {
      await axios
        .post(`${url}/user/activate-account`, { activationLink })
        .then((response) => {
          if (response.data.message) {
            alert(response.data.message);
            history.push("/");
          } else {
            alert(response.data.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card card__">
    <span className="title">Forgot Password?</span>
    <div className="forgot-img">
      <img
        src="https://s3-eu-west-1.amazonaws.com/eazy3img/activations/activation.jpg"
        className="card-img-top real-img"
        alt="forgotpassword-img"
      />
    </div>
      <div className="link">
        Click Here to activate your account
      </div>
      <button className="btn btn-success my-2" onClick={handleClick}>
        Activate
      </button>
     <Link to={"/"} className="link">Signin</Link>
   </div>
  );
};

export default ActivateAccount;
