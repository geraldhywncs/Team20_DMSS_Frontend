import React from "react";
import { useSelector } from "react-redux";
import "../../redux/userNavReducer";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Friends from "../pages/Friends";
import Groups from "../pages/Groups";
import Transactions from "../pages/Transactions";

function ContentArea({ userId }) {
  const navButtons = useSelector((state) => state.userNavbarStore.buttons);

  return (
    <section className="Content-area">
      <>
        {navButtons.map((button, index) => {
          if (button.active) {
            switch (button.name) {
              case "Profile":
                return <Profile userId={userId} />;
              case "Dashboard":
                return <Dashboard userId={userId} />;
              case "Friends":
                return <Friends />;
              case "Groups":
                return <Groups />;
              case "Transactions":
                return <Transactions />;
              // TODO - add your other components in this switch case
              default:
                return (
                  <div key={index}>
                    {button.name} is {button.active ? "active" : "inactive"}
                  </div>
                );
            }
          } else {
            return <div key={index}></div>;
          }
        })}
      </>
    </section>
  );
}

export default ContentArea;
