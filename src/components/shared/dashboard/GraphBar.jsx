import React from "react";

function GraphBar({ height, value, amount }) {
  return (
    <React.Fragment>
      <div className="bar-chartContainer">
        <div className="bar-chartValue">{value}</div>
        <div className="bar" style={{ height: `${height}%` }}></div>
        <div>{`$${amount}`}</div>
      </div>
    </React.Fragment>
  );
}

const mockData = {};

export default GraphBar;
