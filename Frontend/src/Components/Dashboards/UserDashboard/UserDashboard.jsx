import React from "react";
import { Link } from "react-router-dom";
import "../UserDashboard/UserDashboard.css";

export default function UserDashboard() {
  return (
    <div className="bgimg">
      <div>
        <h1
          style={{
            fontFamily: "monospace",
            marginLeft: "19%",
            marginTop: "2%",
          }}
        >
          IT'S TIME TO FLY..!!!
        </h1>
        <Link
          to={`/${window.btoa('flights')}`}
          style={{
            width: "45%",
            fontSize: "130%",
          }}
        >
          <button
            style={{
              marginLeft: "61.8%",
              backgroundColor: "black",
              color: "white",
              marginTop: "23%",
              borderRadius: "10px",
            }}
          >
            START BOOKING &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="25"
              fill="currentColor"
              class="bi bi-arrow-right-circle"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
