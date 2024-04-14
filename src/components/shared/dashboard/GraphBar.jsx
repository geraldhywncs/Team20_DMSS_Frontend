import React from "react";

function GraphBar({ height, value, amount }) {
  
  function formatAmount(amount) {
    return parseFloat(amount).toFixed(2); 
  }

  const formattedAmount = formatAmount(amount);
  return (
    <React.Fragment>
      <div className="bar-chartContainer">
        <div className="bar-chartValue">{value}</div>
        <div className="bar" style={{ height: `${height}%` }}></div>
        <div>{`$${formattedAmount}`}</div>
      </div>
    </React.Fragment>
  );
}

export default GraphBar;
