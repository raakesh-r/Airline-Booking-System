import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../BookingDetails/Book.css";
export default function UpdateBooking() {
  const roleId = JSON.parse(localStorage.getItem("roleId"));
  const navigate = useNavigate();
  const location = useLocation();
  const [flights, setflights] = useState([]);
  const [updatedBooking, setupdatedBooking] = useState({
    bookingId: location.state.bookingid.selectedRow,
    customerName: "",
    seatType: "",
    origin: "",
    destination: "",
    date: "",
    nop: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setupdatedBooking({ ...updatedBooking, [e.target.name]: value });
  };
  const updatingBooking = (e) => {
    toast.info(
      `Please Wait !!! Updating Reservation. Check your Email for Confirmation.`,
      {
        position: "top-center",
      }
    );
    e.preventDefault();
    apiCalls
      .updateBooking(updatedBooking)
      .then((response) => {
        console.log(updatedBooking);
        toast.info(`SUCCESSFULLY UPDATED`, {
          position: "top-center",
        });
        if (roleId == 3) {
          navigate(`/${window.btoa('viewBooking')}`);
        } else if (roleId == 1) {
          navigate(`/${window.btoa('viewBooking')}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    async function getData() {
      apiCalls

        .getBookingbyBookingId(location.state.bookingid.selectedRow)

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
    <div className="addbookbg">
      <div className="container">
        <div className="row">
          <h3 className="text-center" style={{ fontFamily: "fantasy" }}>
            UPDATE BOOKING
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
                <div>
                  <label>Customer Name:</label>
                  <input
                    type="text"
                    name="customerName"
                    placeholder={flights.customerName}
                    className="form-control"
                    value={updatedBooking.customerName}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>Seat Type:</label>
                  {/* <select
                    type="text"
                    name="seatType"
                    className="form-select"
                    aria-label="Default select example"
                    value={updatedBooking.seatType}
                    onChange={(a) => handleChange(a)}
                  >
                    <option selected>Select Seat Type</option>
                    <option value="First Class">First Class</option>
                    <option value="Business Class">Business Class</option>
                    <option value="Economy Class">Economy Class</option>
                  </select> */}
                  <select
                    // style={{
                    //   marginLeft: "56%",
                    //   borderRadius: "7%",
                    //   fontSize: "60%",
                    //   fontFamily: "inherit",
                    // }}
                    type="text"
                    name="seatType"
                    className="form-select"
                    aria-label="Default select example"
                    value={updatedBooking.seatType}
                    onChange={(a) => handleChange(a)}
                  >
                    <option value=" ">SELECT SEAT TYPES</option>
                    <option value="First Class">First Class</option>
                    <option value="Business Class">Business Class</option>
                    <option value="Economy Class">Economy Class</option>
                  </select>
                  <label>Origin:</label>
                  <input
                    type="text"
                    name="origin"
                    placeholder={flights.origin}
                    className="form-control"
                    value={updatedBooking.origin}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>destination:</label>
                  <input
                    type="text"
                    name="destination"
                    placeholder={flights.destination}
                    className="form-control"
                    value={updatedBooking.destination}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>date:</label>
                  <input
                    type="date"
                    name="date"
                    placeholder={flights.date}
                    className="form-control"
                    value={updatedBooking.date}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>NOP:</label>
                  <input
                    type="text"
                    name="nop"
                    placeholder={flights.nop}
                    className="form-control"
                    value={updatedBooking.nop}
                    onChange={(a) => handleChange(a)}
                  />
                  {/* <label>Total Price:</label>
                  <input
                    type="text"
                    name="totalPrice"
                    placeholder={location.state.bookingDetails.book.totalPrice}
                    className="form-control"
                    value={updatedBooking.totalPrice}
                    onChange={(a) => handleChange(a)}
                  /> */}
                </div>
                <div style={{ marginTop: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    autoFocus
                    onClick={updatingBooking}
                  >
                    Update
                  </button>
                  <Link to={`/${window.btoa('viewBooking')}`}>
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
