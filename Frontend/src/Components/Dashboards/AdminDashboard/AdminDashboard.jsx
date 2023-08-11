import React from "react";
import { Link } from "react-router-dom";
import "../AdminDashboard/AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="adminbg">
      <div style={{ marginTop: "21px" }}>
        <h1
          className="text-center"
          style={{
            fontFamily:
              "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
          }}
        >
          WELCOME TO PERSISTENT AIRWAYS !!!
        </h1>
        <div style={{ marginTop: "60px" }}>
          <Link to={`/${window.btoa('flights')}`} style={{ marginLeft: "320px" }}>
            <button
              style={{
                backgroundColor: "yellow",
                color: "black",
                borderRadius: "10px",
                fontSize: "22px",
                fontFamily: "fantasy",
              }}
            >
              FLIGHT DETAILS
            </button>
          </Link>
          <Link to={`/${window.btoa('viewBooking')}`} style={{ marginLeft: "70px" }}>
            <button
              style={{
                backgroundColor: "yellow",
                color: "black",
                borderRadius: "10px",
                fontSize: "22px",
                fontFamily: "fantasy",
              }}
            >
              RESERVATION DETAILS
            </button>
          </Link>
          <Link to={`/${window.btoa('viewAllUsers')}`} style={{ marginLeft: "70px" }}>
            <button
              style={{
                backgroundColor: "yellow",
                color: "black",
                borderRadius: "10px",
                fontSize: "22px",
                fontFamily: "fantasy",
              }}
            >
              USER DETAILS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
