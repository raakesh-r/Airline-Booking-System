import React, { useState, useContext } from "react";
import AuthService from "../../Auth/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  function onSubmit() {
    textFieldOnChange();
    fetchUserToken();
  }
  function textFieldOnChange() {
    setError(false);
    setNameHelperText("");
    setPasswordHelperText("");
  }
  const handleSubmit = () => {
    fetchUserToken();
  };
  const handleSubmission = () => {
    navigate(`/${window.btoa('register')}`);
  };
  async function fetchUserToken() {
    const authRequest = {
      username: name,
      password: password,
    };
    AuthService.login(name, password)
      .then((res) => {
        if (res == 1) {
          navigate(`/${window.btoa('adminDashboard')}`);
        } else if (res == 2) {
          navigate(`/${window.btoa('managerDashboard')}`);
        } else if (res == 3) {
          // console.log(`/${atob('userDashboard')}`)
          navigate(`/${window.btoa('userDashboard')}`);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("INVALID CREDENTIALS !!!");
      });
  }
  return (
    <div className="loginClass">
      <div className="form" style={{ marginTop: "9%", marginLeft: "6%" }}>
        <div className="input-container">
          <label className="label">
            <p className="textCon">USERNAME: </p>
          </label>
          <input
            style={{ width: "50%", marginLeft: "3%" }}
            type="text"
            name="username"
            className="input"
            placeholder="Username"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="label">
            <p className="textCon">PASSWORD: </p>
          </label>
          <input
            style={{ width: "50%", marginLeft: "3%" }}
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" id="login-btn" onClick={handleSubmit}>
          LOGIN
        </button>
      </div>
      <div style={{ marginTop: "2%", marginLeft: "10%" }}>
        <button type="submit" id="register-btn" onClick={handleSubmission}>
          New User can Click here to Register
        </button>
      </div>
    </div>
  );
}
