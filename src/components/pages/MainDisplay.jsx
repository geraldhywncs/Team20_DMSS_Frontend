import React, { useState, useEffect } from "react";
import "../../App.css";
import Header from "../shared/Header";
import Navbar from "../shared/Navbar";
import ContentArea from "../shared/ContentArea";
import LoginSignUp from "./LoginSignUp";
import ResetPassword from "./ResetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function MainDisplay() {
  const [userId, setUserId] = useState("1");
  useEffect(() => {
    localStorage.setItem("userId", "");
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const renderPage = () => {
    switch (userId) {
      case "":
        return <LoginSignUp setUserId={setUserId} />;
      default:
        return (
          <div>
            <Header></Header>
            <div className="Display-container">
              <Navbar />
              <ContentArea userId={userId} />
            </div>
          </div>
        );
    }
  };

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/changePassword" element={<ResetPassword />} />
          <Route path="/" element={renderPage()} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default MainDisplay;
