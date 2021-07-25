import React from "react";

const UserInput = ({ handleChange, longUrl, handleClick }) => {
  return (
    <div className="form-inline">
      <div className="lable1" htmlFor="longUrl" >
        Enter Your URL Here 
      </div>
      <input
        type="text"
        id="longUrl"
        placeholder="Enter your URL here"
        className="form-control col-8"
        value={longUrl}
        required
        onChange={(e) => {
          handleChange(e);
        }}
      /> 
      <div className="btn-container">
      <button type="submit" className="btn btn-success my-2" onClick={() => {handleClick();}}>Click to Shorten</button>
    </div></div>
  );
};

export default UserInput;
