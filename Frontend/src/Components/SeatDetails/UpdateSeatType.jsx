import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../SeatDetails/Seat.css";

export default function UpdateSeatType() {
  const navigate = useNavigate();
  const location = useLocation();
  const [seat, setseat] = useState([]);
  const [addSeatType, setSeatTypes] = useState({
    seatId: location.state.seatTypesObj.selectedRow,
    flightId: "",
    seatType: "",
    availableSeats: "",
    price: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setSeatTypes({ ...addSeatType, [e.target.name]: value });
  };

  const changeSeatType = (e) => {
    const value = e.target.value;
    console.log(value);
    setSeatTypes({ ...addSeatType, [e.target.name]: value });
  };

  const updateSeatType = (e) => {
    addSeatType.flightId = seat.flightId;
    e.preventDefault();
    navigate(`/${window.btoa('flights')}`);
    apiCalls
      .updateSeatType(addSeatType)
      .then((response) => {
        console.log(addSeatType);
        toast.info(`SENT FOR APPROVAL`, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    async function getData() {
      apiCalls

        .getSeatbySeatId(location.state.seatTypesObj.selectedRow)

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
    <div className="flightbg">
      <div className="container">
        <div className="row">
          <h3
            className="text-center"
            style={{ fontFamily: "fantasy", marginTop: "5%" }}
          >
            UPDATE SEAT TYPE
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
                  <div className="form">
                    <label>Choose a Seat Type:</label>
                    <select
                      name="seatType"
                      value={addSeatType.seatType}
                      placeholder={seat.seatType}
                      onChange={(a) => handleChange(a)}
                    >
                      <option value="">Select a Seat Type</option>
                      <option value="First Class">First Class</option>
                      <option value="Business Class">Business Class</option>
                      <option value="Economy Class">Economy Class</option>
                    </select>
                  </div>
                  <label>Available Seats:</label>
                  <input
                    type="text"
                    name="availableSeats"
                    placeholder={seat.availableSeats}
                    className="form-control"
                    value={addSeatType.availableSeats}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>Price:</label>
                  <input
                    type="text"
                    name="price"
                    placeholder={seat.price}
                    className="form-control"
                    value={addSeatType.price}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    autoFocus
                    onClick={updateSeatType}
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
