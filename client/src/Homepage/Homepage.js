import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [todaysCount, setTodaysCount] = useState(0);
  const [monthsCount, setMonthsCount] = useState(0);
  let url ="https://rg-url-shortener-server.herokuapp.com";

  useEffect(async () => {
    try {
      setLoading(true);
      await axios.get(`${url}/urls/counts`).then((response) => {
        if (!response.data.error) {
          setTodaysCount(response.data.todaysCount);
          setMonthsCount(response.data.monthsCount);
          setLoading(false);
        } else {
          alert(response.data.error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h2 className="homepage-heading">Dashboard</h2>
      {!loading && (
        <div className="homepage">
          <div className="card1">
            <h2 className="counter">{todaysCount}</h2>
            <p className="details">URL Count for today</p>
          </div>

          <div className="card1">
            <h2 className="counter">{monthsCount}</h2>
            <p className="details">URL Count for this month</p>
          </div>
        </div>
      )}

      <div className="button-section">
        <Link to="/shorten">
          <button className="btn btn-danger my-2">Start URL Shortening</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
