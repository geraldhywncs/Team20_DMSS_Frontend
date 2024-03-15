import React from "react";
import { useSelector } from "react-redux";
import "../../../redux/userNavReducer";

function ContentArea() {
  const navButtons = useSelector((state) => state.userNavbarStore.buttons);

  return (
    <section className="Content-area">
      <h2 className="Content-title">Content Title</h2>
      <div>
        {navButtons.map((button) => (
          <div key={button.name}>
            {button.name} is {button.active ? "active" : "inactive"}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContentArea;
