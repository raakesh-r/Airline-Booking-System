import React, { useState, useContext, useEffect } from "react";
import apiCalls from "../../Service/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import "../User/User.css";
import { toast } from "react-toastify";

export default function User() {
  const navigate = useNavigate();
  const roleId = JSON.parse(localStorage.getItem("roleId"));
  const [users, setUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRadioChange = (rowId) => {
    setSelectedRow(rowId);
  };

  const deleteuser = (id) => {
    setUsers((prevusers) => {
      const updatedusers = prevusers.filter((i) => i.userId !== id);
      return updatedusers;
    });
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
        .getAllUsers()
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
        <h2
          className="text-center"
          style={{
            // marginTop: "1%",
            fontFamily: "fantasy",
            marginLeft: "42%",
            width: "13%",
          }}
        >
          CUSTOMERS
        </h2>
        <div
          className="form4"
          style={{ marginBottom: "0.5%", marginTop: "6%" }}
        >
          <Link to={`/${window.btoa('addUser')}`} style={{ marginLeft: "20px" }}>
            <button className="btn btn-secondary">ADD USER</button>
          </Link>
          <Link
            to="/updateUser"
            state={{ userid: { selectedRow } }}
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
            onClick={() => deleteuser(selectedRow)}
          >
            DELETE
          </button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>SELECT</th>
                {/* <th>UserId</th> */}
                <th>USERNAME</th>
                <th>EMAIL-ID</th>
                <th>PHONE NUMBER</th>
                <th>ROLE</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="text-center" key={user.userId}>
                  <td>
                    <input
                      type="radio"
                      name="selectedRow"
                      checked={selectedRow === user.userId}
                      onChange={() => handleRadioChange(user.userId)}
                    ></input>
                  </td>
                  {/* <td>{user.userId}</td> */}
                  <td>{user.username}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.userPhno}</td>
                  <td>{user.authorities[0].authority}</td>
                  {/* <td>
                    <div>
                      <Link to="/updateUser" state={{ userDetails: { user } }}>
                        <button
                          type="button"
                          className="btn btn-success"
                          style={{ marginLeft: "20px" }}
                        >
                          Update
                        </button>
                      </Link>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
