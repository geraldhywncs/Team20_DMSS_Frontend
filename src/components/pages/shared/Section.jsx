import React from "react";
import "../../../../src/App.css";

// NOTE: children needs to be a react element
// See src/components/pages/Profile.jsx on how to use
function Section({ children, headerName }) {
  return (
    <div className="section-container">
      <div className="section-header">{headerName}</div>
      {children}
    </div>
  );
}

export default Section;
