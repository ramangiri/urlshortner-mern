import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "./Table";
import "./Shorten.css";
import UserInput from "./UserInput";

const Shorten = () => {
  const [longUrl, setLongUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isReqSent, setIsReqSent] = useState(false);
  let url = "https://rg-url-shortener-server.herokuapp.com";

  //Initial rendering
  useEffect(() => {
    try {
      setLoading(true);
      axios.get(`${url}/urls/all-urls`).then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setUrls(response.data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //rerender on new URL creation and URL click
  useEffect(() => {
    try {
      setLoading(true);
      axios.get(`${url}/urls/all-urls`).then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setUrls(response.data);
          setLoading(false);
          setIsReqSent(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [isReqSent]);

  //On input change
  const handleChange = (e) => {
    setLongUrl(e.target.value);
  };

  //On shorten button click
  const handleClick = () => {
    if (longUrl !== "") {
      setLongUrl("");
      try {
        axios.post(`${url}/urls/shorten`, { longUrl }).then((response) => {
          if (!response.data.error) {
            setIsReqSent(true);
          } else {
            alert("Something went wrong! Please try after some time");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter URL");
    }
  };

  //On URL click
  const handleUrlClick = () => {
    setIsReqSent(true);
  };

  return (
    <div>
      <h2 className="shorten-heading">URL Shortner</h2>
      
      
      <div className="container ">
        <UserInput
          handleChange={handleChange}
          longUrl={longUrl}
          handleClick={handleClick}
        />
        <Table loading={loading} handleUrlClick={handleUrlClick} urls={urls} />

        <Link to="/homepage">
     <button type="button" className="btn1 btn-success">
          Back to homepage
     </button>
 </Link>
 <Link to="/">
     <button type="button" className="btn2 btn-danger">
          Logout
     </button>
 </Link>

      </div>
      
    </div>
  );
};

export default Shorten;
