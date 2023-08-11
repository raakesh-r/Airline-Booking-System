import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../Register/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    userEmail: "",
    userPhno: "",
    password: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  const saveUser = (e) => {
    console.log(user);
    e.preventDefault();
    apiCalls
      .saveUser(user)
      .then((response) => {
        console.log(response);
        console.log(user);
        toast.success(`User Added Successfully`, {
          position: "top-center",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="regbg">
      <div className="container">
        <div className="row">
          <h3 className="text-center" style={{ fontFamily: "fantasy" }}>
            USER REGISTRATION
          </h3>
          <div
            className="card col-md-5 offset-md-2 offset-md-3"
            style={{
              marginTop: "30px",
              backgroundColor: "ButtonShadow",
              marginLeft: "10px",
            }}
          >
            <div>
              <h3 className="text-center"></h3>
              <div className="card-body">
                <div className="form">
                  <label>USERNAME</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter your Name"
                    value={user.username}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
                <div className="form">
                  <label>EMAIL-ID</label>
                  <input
                    type="email"
                    name="userEmail"
                    className="form-control"
                    placeholder="Enter a valid EmailId"
                    value={user.userEmail}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
                <div className="form">
                  <label>PHONE NUMBER</label>
                  <input
                    type="tel"
                    name="userPhno"
                    className="form-control"
                    placeholder="Enter a valid PhoneNumber"
                    value={user.userPhno}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
                <div className="form">
                  <label>PASSWORD</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Create a New Password"
                    value={user.password}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                autoFocus
                onClick={saveUser}
                style={{ marginTop: "20px", right: "0px", marginBottom: "3%" }}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
