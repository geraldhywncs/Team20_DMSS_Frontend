import React from "react";
import { useSelector } from "react-redux";
import "../../../redux/userNavReducer";
import Profile from "../Profile";

function ContentArea() {
  const navButtons = useSelector((state) => state.userNavbarStore.buttons);

  return (
    <section className="Content-area">
      {/* TODO - remove content title because in each page, each section has a title, page has no title */}
      <h2 className="Content-title">Content Title</h2>
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
          }
        })}
      </div>
    </section>
  );
}

export default ContentArea;
