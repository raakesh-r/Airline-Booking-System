import React from "react";
import tick from "./404-tick.png";
import "../BookingDetails/Confirm.css";
import { Link } from "react-router-dom";
export default function Confirmed() {
  return (
    <div className="container1">
      <div className="popup">
        <img src={tick}></img>
        <h2>SUCCESS !!!</h2>
        <p> Your booking has been confirmed. You will recieve your booking
              details via your e-mail id.</p>
        <Link to={`/${window.btoa('viewBooking')}`}>
        <button type="button">VIEW RESERVATIONS</button>
        </Link>
      </div>
    </div>
  );
}
