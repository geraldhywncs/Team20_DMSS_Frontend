import React from "react";
import GraphBar from "./GraphBar";

function GraphDayLayout() {
  return (
    <React.Fragment>
      <GraphBar height={20} value="Groceries" />
      <GraphBar height={22} value="Bills" />
    </React.Fragment>
  );
}

export default GraphDayLayout;
