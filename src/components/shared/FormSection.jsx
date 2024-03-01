import React from "react";

function FormSection({ children, col, place }) {
  return (
    <div className={`${col ? `col-span-${col}` : ""} ${place ? `sm:col-span-${place}` : ""}`}>
      {children}
    </div>
  );
}

export default FormSection;
