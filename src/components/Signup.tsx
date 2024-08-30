import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "./ErrorPopUp";
import heroBackground from "../assets/heroBackground.jpg";
import logo from "../assets/logo-transparent-png.png";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [signUpError, setSignUpError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSignUpError(true);
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    const newUser = {
      username,
      password,
    };

    axios
      .post("http://localhost:3000/home", newUser, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        console.log("Sign up successful!");
        navigate("/home");
      })
      .catch(() => {
        setSignUpError(true);
        setErrorMessage("Error during sign up. Please try again.");
      });
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center right",
    flexDirection: "column",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "48px",
    marginTop: "0px",
    fontFamily: "Poppins",
    marginBottom: "2px",
  };

  const h2Style: React.CSSProperties = {
    fontSize: "10px",
    marginTop: "0px",
    fontFamily: "Poppins",
  };

  const inputIcon: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    width: "200px",
    marginBottom: "15px",
    marginTop: "20px",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    display: "block",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  };

  const inputStyle: React.CSSProperties = {
    paddingLeft: "30px",
    height: "30px",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "Poppins",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const loginContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
  };

  const loginTextStyles: React.CSSProperties = {
    fontFamily: "Poppins",
    fontSize: "12px",
    marginRight: "10px",
    maxWidth: "60px",
  };

  const loginButtonStyles: React.CSSProperties = {
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
        <h1 style={titleStyle}>Sign Up</h1>
        <h2 style={h2Style}>
          to start tracking your bird sightings on BeakBook
        </h2>
        <form style={formStyle} onSubmit={handleSignUp}>
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
          <div style={inputIcon}>
            <i className="fas fa-lock" style={iconStyle}></i>
            <label htmlFor="confirmPassword"></label>
            <input
              style={inputStyle}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
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
            Sign Up
          </button>
        </form>
        <div style={loginContainerStyle}>
          <p style={loginTextStyles}>Already a user?</p>
          <button style={loginButtonStyles} onClick={handleLoginClick}>
            Log in
          </button>
        </div>
      </div>
      <ErrorPopup
        message={errorMessage}
        visible={signUpError}
        onClose={() => setSignUpError(false)}
      />
    </div>
  );
};

export default SignUpForm;
