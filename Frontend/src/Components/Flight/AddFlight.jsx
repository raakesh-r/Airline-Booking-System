import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../Flight/Flight.css";

export default function AddFlight() {
  const navigate = useNavigate();
  const [addflight, setflight] = useState({
    flightName: "",
    takeOffTime: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setflight({ ...addflight, [e.target.name]: value });
  };
  const saveFlight = (e) => {
    e.preventDefault();
    // navigate(`/${window.btoa('flights')}`);
    apiCalls
      .addFlight(addflight)
      .then((response) => {
        navigate(`/${window.btoa('flights')}`);
        toast.info(`SENT FOR APPROVAL`, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flightsbg">
      <div className="container">
        <div className="row">
          <h3
            className="text-center"
            style={{ fontFamily: "fantasy", marginTop: "5%" }}
          >
            ADD FLIGHT
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
                <div className="form">
                  <label>Flight Name:</label>
                  <input
                    type="text"
                    name="flightName"
                    placeholder="Type the flight name"
                    className="form-control"
                    value={addflight.flightName}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>TakeOff Time:</label>
                  <input
                    type="text"
                    name="takeOffTime"
                    placeholder="Type the TakeOff Time"
                    className="form-control"
                    value={addflight.takeOffTime}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-success"
                    autoFocus
                    onClick={saveFlight}
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
