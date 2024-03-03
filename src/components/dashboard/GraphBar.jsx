import React from "react";

function GraphBar({ height }) {
  return (
    <React.Fragment>
      <div className="bar-chartContainer">
        <div className="bar-chartValue">Mon</div>
        <div className="bar" style={{ height: `${height}%` }}></div>
        <div>$100</div>
      </div>
    </React.Fragment>
  );
}

const mockData = {};

export default GraphBar;
