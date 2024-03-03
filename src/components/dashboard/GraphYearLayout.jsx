import React from "react";
import GraphBar from "./GraphBar";
import constants from "../../constants/constants";

function GraphYearLayout() {
  const monthHeights = [20, 80, 30, 40, 80, 50, 80, 60, 40, 20, 10, 30];

  return (
    <React.Fragment>
      {monthHeights.map((height, index) => (
        <GraphBar
          key={index}
          height={height}
          value={constants.months[Object.keys(constants.months)[index]]}
        />
      ))}
    </React.Fragment>
  );
}

export default GraphYearLayout;
