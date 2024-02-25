import React from "react";
import { useSelector } from "react-redux";
import "../../redux/userNavReducer";
import Profile from "../pages/Profile";

function ContentArea() {
  const navButtons = useSelector((state) => state.userNavbarStore.buttons);

  return (
    <section className="Content-area">
      <div>
        {navButtons.map((button) => {
          if (button.active) {
            switch (button.name) {
              case "Profile":
                return <Profile />;
              // TODO - add your other components in this switch case
              default:
                return (
                  <div key={button.name}>
                    {button.name} is {button.active ? "active" : "inactive"}
                  </div>
                );
            }
          } else {
            return <></>;
          }
        })}
      </div>
    </section>
  );
}

export default ContentArea;
