import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../SeatDetails/Seat.css";

export default function AddSeatType() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.flightid.flightid);
  const flightid = location.state.flightid.flightid;
  const [addSeatType, setSeatTypes] = useState({
    flightId: flightid,
    seatType: "",
    availableSeats: "",
    price: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setSeatTypes({ ...addSeatType, [e.target.name]: value });
  };
  const addSeatTypes = (e) => {
    e.preventDefault();
    apiCalls
      .saveSeatType(addSeatType)
      .then((response) => {
        toast.info(`SENT FOR APPROVAL`, {
          position: "top-center",
        });
        navigate(`/${window.btoa('flights')}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flightbg">
      <div className="container">
        <div className="row">
          <h3
            className="text-center"
            style={{ fontFamily: "fantasy", marginTop: "5%" }}
          >
            ADD SEAT TYPE
          </h3>
          <div
            className="card col-md-5 offset-md-2 offset-md-3"
            style={{
              marginTop: "30px",
              backgroundColor: "ButtonShadow",
              marginLeft: "10px",
            }}
          >
            <div className="card-body">
              <form>
                {/* <div className="form">
                  <label>Seat Type:</label>
                  <input
                    type="text"
                    name="seatType"
                    placeholder="Type of the Seat"
                    className="form-control"
                    value={addSeatType.seatType}
                    onChange={(a) => handleChange(a)}
                  />
                </div> */}
                <div className="form">
                  <label>Choose a Seat Type:</label>
                  <select
                    name="seatType"
                    value={addSeatType.seatType}
                    onChange={(a) => handleChange(a)}
                  >
                    <option value="">Select a Seat Type</option>
                    <option value="First Class">First Class</option>
                    <option value="Business Class">Business Class</option>
                    <option value="Economy Class">Economy Class</option>
                  </select>
                </div>
                <div className="form">
                  <label>Available Seats:</label>
                  <input
                    type="text"
                    name="availableSeats"
                    placeholder="Type the Available Seats"
                    className="form-control"
                    value={addSeatType.availableSeats}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
                <div className="form">
                  <label>Price:</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter the price"
                    className="form-control"
                    value={addSeatType.price}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-success"
                    autoFocus
                    onClick={addSeatTypes}
                  >
                    Save
                  </button>
                  <Link to={`/${window.btoa('flights')}`}>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "13px" }}
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
