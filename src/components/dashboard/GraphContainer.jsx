import React from "react";
import GraphBar from "./GraphBar";

function GraphContainer() {
  return (
    <React.Fragment>
      <div className="graph-container">
        <GraphBar height={80} />
        <GraphBar height={60} />
        <GraphBar height={40} />
        <GraphBar height={70} />
        <GraphBar height={90} />
        <GraphBar height={50} />
        <GraphBar height={75} />
        <GraphBar height={85} />
      </div>

      <div className="bar-filterContainer">
        <button className="bar-filterButton">Past Day</button>
        <button className="bar-filterButton">Past Week</button>
        <button className="bar-filterButton">Past Month</button>
        <button className="bar-filterButton">Past Year</button>
      </div>
    </React.Fragment>
  );
}

export default GraphContainer;
