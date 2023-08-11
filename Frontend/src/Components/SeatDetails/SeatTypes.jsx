import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../SeatDetails/Seat.css";

export default function SeatTypes() {
  const roleId = JSON.parse(localStorage.getItem("roleId"));
  const navigate = useNavigate();
  const location = useLocation();
  // const flightid = location.state.id.flight.flightId;
  const flightid = location.state.id.selectedRow;
  const [seatTypes, setSeatTypes] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRadioChange = (rowId) => {
    setSelectedRow(rowId);
  };
  const deleteseat = (id) => {
    setSeatTypes((prevseatTypes) => {
      const updatedseatTypes = prevseatTypes.filter((i) => i.seatId !== id);
      return updatedseatTypes;
    });
    toast.error(`SEAT REMOVED`, {
      position: "top-center",
    });
    apiCalls
      .deleteSeatType(id)
      .then((res) => {
        console.log("SEAT REMOVED");
        navigate(`/${window.btoa('managerDashboard')}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const success = (id) => {
    setSeatTypes((prevSeatTypes) => {
      const updatedflights = prevSeatTypes.filter((i) => i.seatId !== id);
      return updatedflights;
    });
    toast.success(`SEAT TYPE SAVED SUCCESSFULLY`, {
      position: "top-center",
    });
    navigate("/managerDashboard");
  };

  const deleteseatType = (id) => {
    setSeatTypes((prevseatTypes) => {
      const updatedseatTypes = prevseatTypes.filter((i) => i.seatId !== id);
      return updatedseatTypes;
    });
    toast.error(`SEAT REMOVED`, {
      position: "top-center",
    });
    apiCalls
      .deleteSeatType(id)
      .then((res) => {
        console.log("SEAT REMOVED");
        navigate(`/${window.btoa('flights')}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    async function getData() {
      apiCalls
        .getSeatByFlightId(flightid)
        .then((res) => {
          console.log(res.data);
          setSeatTypes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);
  if (roleId == 1) {
    return (
      <div className="flightbg">
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
            SEAT TYPES
          </h2>
          <div>
            <Link to={`/${window.btoa('flights')}`}>
              <button type="button" className="btn btn-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-arrow-left-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
                &nbsp;&nbsp;VIEW FLIGHTS
              </button>
            </Link>
            <div
              className="form2"
              style={{ marginBottom: "0.5%", marginTop: "6%" }}
            >
              <Link to={`/${window.btoa('AddBooking')}`} state={{ seatid: { selectedRow } }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginLeft: "20px" }}
                >
                  BOOK TICKETS&nbsp;
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
              <Link
                to={`/${window.btoa('addSeatTypes')}`}
                style={{ marginLeft: "20px" }}
                state={{ flightid: { flightid } }}
              >
                <button className="btn btn-secondary">ADD SEAT TYPES</button>
              </Link>
              <Link
                to={`/${window.btoa('updateSeatTypes')}`}
                state={{ seatTypesObj: { selectedRow } }}
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
                onClick={() => deleteseatType(selectedRow)}
              >
                DELETE
              </button>
            </div>
          </div>
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>SELECT</th>
                  {/* <th>SeatId</th> */}
                  <th>SEAT CLASS</th>
                  <th>AVAILABLE SEATS</th>
                  <th>PRICE</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {seatTypes.map((type) => (
                  <tr className="text-center" key={type.seatId}>
                    <td>
                      <input
                        type="radio"
                        name="selectedRow"
                        checked={selectedRow === type.seatId}
                        onChange={() => handleRadioChange(type.seatId)}
                      ></input>
                    </td>
                    {/* <td>{type.seatId}</td> */}
                    <td>{type.seatType}</td>
                    <td>{type.availableSeats}</td>
                    <td>{type.price}</td>
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
      <div className="flightbg">
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
            SEAT TYPES
          </h2>
          <div>
            <Link to={`/${window.btoa('flights')}`}>
              <button type="button" className="btn btn-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-arrow-left-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
                &nbsp;&nbsp;VIEW FLIGHTS
              </button>
            </Link>
            <div
              className="form2"
              style={{
                marginBottom: "0.5%",
                marginTop: "6%",
                width: "20%",
                marginLeft: "78%",
              }}
            >
              <Link to={`/${window.btoa('AddBooking')}`} state={{ seatid: { selectedRow } }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginLeft: "20px" }}
                >
                  BOOK TICKETS&nbsp;
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
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>SELECT</th>
                  {/* <th>SeatId</th> */}
                  <th>SEAT CLASS</th>
                  <th>AVAILABLE SEATS</th>
                  <th>PRICE</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {seatTypes.map((type) => (
                  <tr className="text-center">
                    <td>
                      <input
                        type="radio"
                        name="selectedRow"
                        checked={selectedRow === type.seatId}
                        onChange={() => handleRadioChange(type.seatId)}
                      ></input>
                    </td>
                    {/* <td>{type.seatId}</td> */}
                    <td>{type.seatType}</td>
                    <td>{type.availableSeats}</td>
                    <td>{type.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else if (roleId == 2) {
    return (
      <div className="flightbg">
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
            style={{
              marginBottom: "0.5%",
              marginTop: "6%",
              width: "25%",
              marginLeft: "76%",
            }}
          >
            <div>
              <button
                type="button"
                className="btn btn-success"
                style={{ marginLeft: "20px" }}
                onClick={success}
              >
                APPROVE
              </button>
              <button
                className="btn btn-danger"
                style={{ marginLeft: "20px" }}
                onClick={() => deleteseat(selectedRow)}
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
                  {/* <th>SeatId</th> */}
                  <th>SEAT CLASS</th>
                  <th>AVAILABLE SEATS</th>
                  <th>PRICE</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {seatTypes.map((type) => (
                  <tr className="text-center">
                    <td>
                      <input
                        type="radio"
                        name="selectedRow"
                        checked={selectedRow === type.seatId}
                        onChange={() => handleRadioChange(type.seatId)}
                      ></input>
                    </td>
                    {/* <td>{type.seatId}</td> */}
                    <td>{type.seatType}</td>
                    <td>{type.availableSeats}</td>
                    <td>{type.price}</td>
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
