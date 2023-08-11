import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import "../BookingDetails/Book.css";
import { toast } from "react-toastify";

export default function ViewBooking() {
  const profileId = JSON.parse(localStorage.getItem("profileId"));
  const roleId = JSON.parse(localStorage.getItem("roleId"));
  const navigate = useNavigate();
  const [booking, setbooking] = useState([]);
  const [specbook, setspecbook] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRadioChange = (rowId) => {
    setSelectedRow(rowId);
  };

  const deletebooking = (id) => {
    setbooking((prevbooking) => {
      const updatedbooking = prevbooking.filter((i) => i.bookingId !== id);
      return updatedbooking;
    });
    toast.error(
      `Please Wait !!! Cancelling your Reservation. Check your Email for Confirmation.`,
      {
        position: "top-center",
      }
    );
    apiCalls
      .deleteBooking(id)
      .then((res) => {
        console.log("CANCELLING RESERVATION");
        navigate(`/${window.btoa('viewBooking')}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    async function getData() {
      apiCalls
        .getAllBookings()
        .then((res) => {
          setbooking(res.data);
          console.log(booking);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    console.log(booking);
  });

  useEffect(() => {
    async function getData() {
      apiCalls
        .getBookingsByUserId(profileId)
        .then((res) => {
          setspecbook(res.data);
          console.log(specbook);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, [profileId]);

  useEffect(() => {
    console.log(specbook);
  });

  if (roleId == 1) {
    return (
      <div className="addbookbg">
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
            RESERVATIONS
          </h2>
          <div className="row">
            <Link to={`/${window.btoa('flights')}`}>
              <button type="button" className="btn btn-primary">
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
                &nbsp;&nbsp;BOOK TICKETS
              </button>
            </Link>
          </div>
          <div
            className="form3"
            style={{ marginBottom: "0.5%", marginTop: "6%" }}
          >
            <Link
              to={`/${window.btoa('updateBooking')}`}
              state={{ bookingid: { selectedRow } }}
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
              onClick={() => deletebooking(selectedRow)}
            >
              DELETE
            </button>
          </div>

          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>SELECT</th>
                  {/* <th>BookingId</th> */}
                  <th>CUSTOMER NAME</th>
                  <th>SEAT CLASS</th>
                  <th>ORIGIN</th>
                  <th>DESTINATION</th>
                  <th>DATE</th>
                  <th>NO. OF PEOPLE</th>
                  <th>TOTAL PRICE</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {booking.map((book) => (
                  <tr className="text-center" key={book.bookingId}>
                    <td>
                      <input
                        type="radio"
                        name="selectedRow"
                        checked={selectedRow === book.bookingId}
                        onChange={() => handleRadioChange(book.bookingId)}
                      ></input>
                    </td>
                    {/* <td>{book.bookingId}</td> */}
                    <td>{book.customerName}</td>
                    <td>{book.seatType}</td>
                    <td>{book.origin}</td>
                    <td>{book.destination}</td>
                    <td>{book.date}</td>
                    <td>{book.nop}</td>
                    <td>{book.totalPrice}</td>
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
      <div className="addbookbg">
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
            RESERVATIONS
          </h2>
          <div className="row">
            <Link to={`/${window.btoa('flights')}`}>
              <button type="button" className="btn btn-primary">
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
                &nbsp;&nbsp;BOOK TICKETS
              </button>
            </Link>
          </div>
          <div
            className="form3"
            style={{ marginBottom: "0.5%", marginTop: "6%" }}
          >
            <Link
              to={`/${window.btoa('updateBooking')}`}
              state={{ bookingid: { selectedRow } }}
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
              onClick={() => deletebooking(selectedRow)}
            >
              DELETE
            </button>
          </div>

          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-center">
                  <th>SELECT</th>
                  {/* <th>BookingId</th> */}
                  <th>CUSTOMER NAME</th>
                  <th>SEAT CLASS</th>
                  <th>ORIGIN</th>
                  <th>DESTINATION</th>
                  <th>DATE</th>
                  <th>NO. OF PEOPLE</th>
                  <th>TOTAL PRICE</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {booking.map((book) => (
                  <tr className="text-center" key={book.bookingId}>
                    <td>
                      <input
                        type="radio"
                        name="selectedRow"
                        checked={selectedRow === book.bookingId}
                        onChange={() => handleRadioChange(book.bookingId)}
                      ></input>
                    </td>
                    {/* <td>{book.bookingId}</td> */}
                    <td>{book.customerName}</td>
                    <td>{book.seatType}</td>
                    <td>{book.origin}</td>
                    <td>{book.destination}</td>
                    <td>{book.date}</td>
                    <td>{book.nop}</td>
                    <td>{book.totalPrice}</td>
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
