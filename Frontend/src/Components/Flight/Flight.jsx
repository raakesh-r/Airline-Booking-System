import React, { useState, useContext, useEffect } from "react";

import apiCalls from "../../Service/apiCalls";

import { Link, useNavigate } from "react-router-dom";

import "../Flight/Flight.css";

import { toast } from "react-toastify";

export default function Flight() {
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

        navigate(`/${window.btoa('flights')}`);
      })

      .catch((err) => {
        console.log(err);
      });
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

  if (roleId == 1) {
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
            className="form1"
            style={{ marginBottom: "0.5%", marginTop: "6%" }}
          >
            <Link to={`/${window.btoa('seatTypes')}`} state={{ id: { selectedRow } }}>
              <button type="button" className="btn btn-primary">
                VIEW SEAT DETAILS
              </button>
            </Link>
            <Link to={`/${window.btoa('addFlight')}`} style={{ marginLeft: "20px" }}>
              <button className="btn btn-secondary">ADD FLIGHT</button>
            </Link>
            <Link
              to={`/${window.btoa('updateFlight')}`}
              state={{ id: { selectedRow } }}
              disabled={selectedRow === null}
            >
              <button
                type="button"
                className="btn btn-success"
                style={{ marginLeft: "20px" }}
              >
                UPDATE
              </button>
            </Link>
            <button
              className="btn btn-danger"
              style={{ marginLeft: "20px" }}
              onClick={() => deleteflight(selectedRow)}
            >
              DELETE
            </button>
          </div>

          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>SELECT</th>
                  {/* <th>SERIAL NO</th> */}

                  <th>FLIGHT NAME</th>

                  <th>TAKE-OFF TIME</th>
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
  } else if (roleId == 3) {
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
            className="form1"
            style={{
              marginBottom: "0.5%",
              marginTop: "6%",
              width: "16%",
              marginLeft: "83%",
            }}
          >
            <Link to={`/${window.btoa('seatTypes')}`} state={{ id: { selectedRow } }}>
              <button type="button" className="btn btn-primary">
                VIEW SEAT DETAILS
              </button>
            </Link>
          </div>
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>SELECT</th>
                  {/* <th>SERIAL NO</th> */}

                  <th>FLIGHT NAME</th>

                  <th>TAKE-OFF TIME</th>
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
}
