import "../App.css";
import { Menu, MenuItem, IconButton, Badge } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import AuthService from "../Auth/AuthService";

export default function Header() {
  const roleId = JSON.parse(localStorage.getItem("roleId"));
  const navigate = useNavigate();
  const [selection, setSelection] = useState({
    number: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setSelection({ ...selection, [e.target.name]: value });
    if (e.target.value == "1") {
      navigate(`/${window.btoa('myprofile')}`);
    } else if (e.target.value == "2") {
      navigate(`/${window.btoa('viewBooking')}`);
    } else if (e.target.value == "3") {
      console.log("logout clicked");
      AuthService.logout();
      navigate("/");
    }
  };

  const movement = () => {
    if (roleId == 1) {
      navigate(`/${window.btoa('adminDashboard')}`);
    } else if (roleId == 2) {
      navigate(`/${window.btoa('managerDashboard')}`);
    } else if (roleId == 3) {
      navigate(`/${window.btoa('userDashboard')}`);
    }
  };
  return (
    <div>
      <header className="header">
        {/* <IconButton color="inherit" onClick={movement()}>
          <Badge badgeContent={0} color="error">
            <FlightTakeoffIcon style={{ width: "40px", height: "40px" }} />
          </Badge>
        </IconButton> */}
        <button
          onClick={movement}
          style={{ backgroundColor: "black", height: "40px" }}
        >
          <FlightTakeoffIcon
            style={{ width: "40px", height: "40px", color: "white" }}
          />
        </button>
        <span>&nbsp;Persistent Airways</span>

        <select
          style={{
            marginLeft: "56%",
            borderRadius: "7%",
            fontSize: "60%",
            fontFamily: "inherit",
          }}
          name="number"
          value={selection.number}
          onChange={(a) => handleChange(a)}
        >
          <option value=" ">PROFILE</option>
          <option value="1">VIEW PROFILE</option>
          <option value="2">RESERVATIONS</option>
          <option value="3">LOGOUT</option>
        </select>
      </header>
    </div>
  );
}
