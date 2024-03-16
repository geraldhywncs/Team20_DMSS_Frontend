import React, {useState, useEffect} from 'react';
import "../../App.css";
import Header from "../shared/Header";
import Navbar from "../shared/Navbar";
import ContentArea from "../shared/ContentArea";
import LoginSignUp from "./LoginSignUp";
import ResetPassword from './ResetPassword';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function MainDisplay() {
  /*
    Note in the main display, we will have 3 components (for now)
    1. The header (username and app title)
    2. The verical nav bar
    3. The main display * This is the component that will be re-rendered based on what the user click.
        When the user clicks for eg. Home, the currentState should be stored as Home and this will re-render the component
        Trigger what needs to be displayed. In this case the home page.
  */
  const [userId, setUserId] = useState("");
  useEffect(() => {
      localStorage.setItem('userId', "");
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
          setUserId(storedUserId);
      }
  }, []);

  const renderPage = () => {
    switch (userId) {
      case "":
        return <LoginSignUp setUserId={setUserId}/>;
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
          <Route 
          path="/changePassword"
          element={<ResetPassword/>}/>
          <Route path="/" element={renderPage()}/>
        </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default MainDisplay;
