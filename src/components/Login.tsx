import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "./ErrorPopUp";
import logo from "../assets/logo-transparent-png.png";
import heroBackground from "../assets/heroBackground.jpg";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signUpClick = () => {
    navigate("/signup");
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    axios
      .post("http://localhost:3000/login", user, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
        setLoginError(true);
        setErrorMessage("Invalid login information. Please try again.");
      });
  };

  const containerStyle = {
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center right", // Align with other components
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const titleStyle = {
    fontSize: "48px",
    marginTop: "0px",
    fontFamily: "Poppins",
    marginBottom: "2px",
  };

  const h2Style = {
    fontSize: "10px",
    marginTop: "0px",
    fontFamily: "Poppins",
  };

  const inputIcon = {
    position: "relative" as const,
    display: "inline-block",
    width: "200px",
    marginBottom: "15px",
    marginTop: "20px",
  };

  const iconStyle = {
    position: "absolute" as const,
    display: "block",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none" as const,
  };

  const inputStyle = {
    paddingLeft: "30px",
    height: "30px",
    width: "100%",
    boxSizing: "border-box" as const,
    fontFamily: "Varela Round",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
  };

  const signUpContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
  };

  const signUpTextStyles = {
    fontFamily: "Poppins",
    fontSize: "12px",
    marginRight: "10px",
    maxWidth: "60px",
  };

  const signUpButtonStyles = {
    fontFamily: "Poppins",
    height: "30px",
    backgroundColor: "#86f9f9",
    cursor: "pointer",
    borderRadius: "3px",
  };

  return (
    <div style={containerStyle}>
      <img
        src={logo}
        alt="Logo"
        style={{
          width: "150px",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          height: "28px",
        }}
      />
      <div
        style={{
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          margin: "10px",
          paddingTop: "20px",
          paddingBottom: "30px",
          paddingRight: "40px",
          paddingLeft: "40px",
          background:
            "radial-gradient(circle at right bottom, #ffe0c2 , #c2ffff)",
        }}
      >
        <h1 style={titleStyle}>Login</h1>
        <h2 style={h2Style}>to view BeakBook and track your bird sightings</h2>
        <form style={formStyle} onSubmit={handleLogin}>
          <div style={inputIcon}>
            <i className="fas fa-user" style={iconStyle}></i>
            <label htmlFor="username"></label>
            <input
              style={inputStyle}
              type="text"
              id="username"
              name="username"
              placeholder="@Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div style={inputIcon}>
            <i className="fas fa-lock" style={iconStyle}></i>
            <label htmlFor="password"></label>
            <input
              style={inputStyle}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            style={{
              cursor: "pointer",
              height: "35px",
              fontFamily: "Poppins",
              width: "200px",
            }}
            type="submit"
          >
            Log in
          </button>
        </form>
        <div style={signUpContainerStyle}>
          <p style={signUpTextStyles}>Not a user yet?</p>
          <button style={signUpButtonStyles} onClick={signUpClick}>
            Sign up
          </button>
        </div>
      </div>
      <ErrorPopup
        message={errorMessage}
        visible={loginError}
        onClose={() => setLoginError(false)}
      />
    </div>
  );
};

export default LoginForm;
