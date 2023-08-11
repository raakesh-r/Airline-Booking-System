import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../Flight/Flight.css";

export default function UpdateFlight() {
  const navigate = useNavigate();
  const location = useLocation();
  const [flight, setflights] = useState([]);
  const [addflight, setflight] = useState({
    flightId: location.state.id.selectedRow,
    flightName: "",
    takeOffTime: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setflight({ ...addflight, [e.target.name]: value });
  };

  const updateFlight = (e) => {
    e.preventDefault();
    apiCalls
      .updateFlightById(addflight)
      .then((response) => {
        console.log(addflight);
        navigate(`/${window.btoa('flights')}`);
        toast.info(`SENT FOR APPROVAL`, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate(`/${window.btoa('flights')}`);
  };

  useEffect(() => {
    async function getData() {
      apiCalls

        .getFlightbyFlightId(location.state.id.selectedRow)

        .then((res) => {
          setflights(res.data);
        })

        .catch((err) => {
          console.log(err);
        });
    }

    getData();
  }, []);

  return (
    <div className="flightsbg">
      <div className="container">
        <div className="row">
          <h3
            className="text-center"
            style={{ fontFamily: "fantasy", marginTop: "5%" }}
          >
            UPDATE FLIGHT
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
                    placeholder={flight.flightName}
                    className="form-control"
                    value={addflight.flightName}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>TakeOff Time:</label>
                  <input
                    type="text"
                    name="takeOffTime"
                    placeholder={flight.takeOffTime}
                    className="form-control"
                    value={addflight.takeOffTime}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    autoFocus
                    onClick={updateFlight}
                  >
                    Update
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
