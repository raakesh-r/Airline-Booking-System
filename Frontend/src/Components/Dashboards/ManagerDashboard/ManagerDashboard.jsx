import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../../Service/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";
import { toast } from "react-toastify";
export default function ManagerDashboard() {
  const roleId = JSON.parse(localStorage.getItem("roleId"));
  const navigate = useNavigate();
  const [flights, setflights] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRadioChange = (rowId) => {
    setSelectedRow(rowId);
  };
  const deleteflight = (id) => {
    setflights((prevflights) => {
      const updatedflights = prevflights.filter((i) => i.flightId !== id);
      return updatedflights;
    });
    toast.error(`FLIGHT REMOVED`, {
      position: "top-center",
    });
    apiCalls
      .deleteFlightById(id)
      .then((res) => {
        console.log("FLIGHT REMOVED");
        navigate(`/${window.btoa('managerDashboard')}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const success = (id) => {
    setflights((prevflights) => {
      const updatedflights = prevflights.filter((i) => i.flightId !== id);
      return updatedflights;
    });
    toast.success(`Flight Saved`, {
      position: "top-center",
    });
    navigate(`/${window.btoa('managerDashboard')}`);
  };

  useEffect(() => {
    async function getData() {
      apiCalls
        .getAllFlights()
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
        <h2
          className="text-center"
          style={{
            // marginTop: "1%",
            fontFamily: "fantasy",
            marginLeft: "42%",
            width: "13%",
          }}
        >
          FLIGHTS
        </h2>
        <div
          className="form7"
          style={{ marginBottom: "0.5%", marginTop: "6%" }}
        >
          <div>
            <Link to={`/${window.btoa('seatTypes')}`} state={{ id: { selectedRow } }}>
              <button type="button" className="btn btn-secondary">
                View Seat Details
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-success"
              style={{ marginLeft: "20px" }}
              onClick={() => success(selectedRow)}
            >
              APPROVE
            </button>

            <button
              className="btn btn-danger"
              style={{ marginLeft: "20px" }}
              onClick={() => deleteflight(selectedRow)}
            >
              DISAPPROVE
            </button>
          </div>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>SELECT</th>
                {/* <th>FlightId</th> */}
                <th>FLIGHT NAME</th>
                <th>TAKE-OFF TIME</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr className="text-center" key={flight.flightId}>
                  <td>
                    <input
                      type="radio"
                      name="selectedRow"
                      checked={selectedRow === flight.flightId}
                      onChange={() => handleRadioChange(flight.flightId)}
                    ></input>
                  </td>
                  {/* <td>{flight.flightId}</td> */}
                  <td>{flight.flightName}</td>
                  <td>{flight.takeOffTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
