import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../User/User.css";

export default function UpdateUser() {
  const roleId = JSON.parse(localStorage.getItem("roleId"));
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUsers] = useState([]);
  const [updatedUser, setupdatedUser] = useState({
    userId: location.state.userid.selectedRow,
    username: "",
    userEmail: "",
    userPhno: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setupdatedUser({ ...updatedUser, [e.target.name]: value });
    console.log(updatedUser);
  };

  const updatingUser = (e) => {
    e.preventDefault();
    apiCalls
      .updateUser(updatedUser)
      .then((response) => {
        console.log(updatedUser);
        toast.success(`Successfully Updated User Detail`, {
          position: "top-center",
        });
        if (roleId == 3) {
          navigate("/");
        } else if (roleId == 1) {
          navigate(`/${window.btoa('viewAllUsers')}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    async function getData() {
      apiCalls
        .getUserByUserId(location.state.userid.selectedRow)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, []);
  return (
    <div className="updateprofilebg">
      <div className="container">
        <div className="row">
          <h3 className="text-center" style={{ fontFamily: "fantasy" }}>
            UPDATE USER
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
                  <label>UserName:</label>
                  <input
                    type="text"
                    name="username"
                    placeholder={user.username}
                    className="form-control"
                    value={updatedUser.username}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>Email Id:</label>
                  <input
                    type="email"
                    name="userEmail"
                    placeholder={user.userEmail}
                    className="form-control"
                    value={updatedUser.userEmail}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="userPhno"
                    placeholder={user.userPhno}
                    className="form-control"
                    value={updatedUser.userPhno}
                    onChange={(a) => handleChange(a)}
                  />
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder={user.password}
                    className="form-control"
                    value={updatedUser.password}
                    onChange={(a) => handleChange(a)}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    autoFocus
                    onClick={updatingUser}
                  >
                    Update
                  </button>
                  <Link to={`/${window.btoa('viewAllUsers')}`}>
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
