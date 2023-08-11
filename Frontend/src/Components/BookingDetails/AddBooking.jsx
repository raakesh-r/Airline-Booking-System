import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../BookingDetails/Book.css";

export default function AddBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const profileId = JSON.parse(localStorage.getItem("profileId"));
  const seatid = location.state.seatid.selectedRow;
  const [seat, setseat] = useState([]);
  const [addBooking, setaddBooking] = useState({
    customerId: profileId,
    seatType: "",
    flightId: "",
    origin: "",
    destination: "",
    date: "",
    nop: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setaddBooking({ ...addBooking, [e.target.name]: value });
  };
  const saveBooking = (e) => {
    addBooking.flightId = seat.flightId;
    addBooking.seatType = seat.seatType;
    console.log(addBooking);
    toast.info(`Reservation in process. Please wait !!!`, {
      position: "top-center",
    });
    e.preventDefault();
    apiCalls
      .addBooking(addBooking)
      .then((response) => {
        navigate(`/${window.btoa('success')}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    async function getData() {
      apiCalls

        .getSeatbySeatId(seatid)

        .then((res) => {
          setseat(res.data);
        })

        .catch((err) => {
          console.log(err);
        });
    }

    getData();
  }, []);
  return (
    <div>
      <div className="bookbg">
        <h2 className="text-center" style={{ fontFamily: "cursive" }}>
          BOOK TICKETS
        </h2>
        <div className="form" style={{ marginTop: "3%", marginLeft: "63%" }}>
          <div className="input-container">
            <form className="label">
              <div className="form">
                <label style={{ fontFamily: "cursive", fontSize: "130%" }}>
                  Origin:
                </label>
                <input
                  type="text"
                  name="origin"
                  placeholder="Enter the Origin place"
                  className="form-control"
                  value={addBooking.origin}
                  onChange={(a) => handleChange(a)}
                />
                <label style={{ fontFamily: "cursive", fontSize: "130%" }}>
                  Destination:
                </label>
                <input
                  type="text"
                  name="destination"
                  placeholder="Enter the destination place"
                  className="form-control"
                  value={addBooking.destination}
                  onChange={(a) => handleChange(a)}
                />
                <label style={{ fontFamily: "cursive", fontSize: "130%" }}>
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  placeholder="Enter the date"
                  className="form-control"
                  value={addBooking.date}
                  onChange={(a) => handleChange(a)}
                />
                <label style={{ fontFamily: "cursive", fontSize: "130%" }}>
                  NOP:
                </label>
                <input
                  type="text"
                  name="nop"
                  placeholder="Enter the number of passengers"
                  className="form-control"
                  value={addBooking.nop}
                  onChange={(a) => handleChange(a)}
                />
              </div>
              <div
                style={{
                  fontFamily: "cursive",
                  fontSize: "130%",
                  marginLeft: "35%",
                }}
              >
                <button
                  type="submit"
                  id="login-btn"
                  className="btn btn-primary"
                  autoFocus
                  onClick={saveBooking}
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
