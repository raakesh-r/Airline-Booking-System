import React, { useState, useContext, useEffect } from "react";

import apiCalls from "../../Service/apiCalls";

import { Link, useNavigate } from "react-router-dom";

import "../User/User.css";

import { toast } from "react-toastify";

export default function SpecificProfile() {
  const selectedRow = JSON.parse(localStorage.getItem("profileId"));

  const [user, setUsers] = useState([]);

  const navigate = useNavigate();

  const roleId = JSON.parse(localStorage.getItem("roleId"));

  const deleteuser = (id) => {
    toast.error(`USER DELETED`, {
      position: "top-center",
    });

    apiCalls

      .deleteUser(id)

      .then((res) => {
        if (roleId == 1) {
          navigate(`/${window.btoa('viewAllUsers')}`);
        } else if (roleId == 3) {
          navigate("/");
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    async function getData() {
      apiCalls

        .getUserByUserId(selectedRow)

        .then((res) => {
          setUsers(res.data);
        })

        .catch((err) => {
          console.log(err);
        });
    }

    getData();
  }, [selectedRow]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="profilebg">
      <h2
        className="text-center"
        style={{
          fontFamily: "-moz-initial",

          fontSize: "42px",

          marginTop: "3%",

          marginLeft: "8%",
        }}
      >
        MY PROFILE
      </h2>

      <div
        className="card"
        style={{
          justifyContent: "center",

          marginTop: "4%",

          marginLeft: "34%",

          width: "40%",

          height: "50%",

          backgroundColor: "ButtonHighlight",
        }}
      >
        <div
          className="card-body"
          style={{ fontFamily: "sans-serif", fontSize: "19px" }}
        >
          <p>USER ID : {user.userId}</p>

          <p>USER NAME : {user.username}</p>

          <p>USER EMAIL-ID : {user.userEmail}</p>

          <p>USER PH.NO : {user.userPhno}</p>

          <div style={{ marginTop: "10%" }}>
            <Link to={`/${window.btoa('updateUser')}`} state={{ userid: { selectedRow } }}>
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
              onClick={() => deleteuser(user.userId)}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
