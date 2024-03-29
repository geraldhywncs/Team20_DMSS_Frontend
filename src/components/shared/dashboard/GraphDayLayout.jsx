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

/*
1. Needs to call the expense API based on the expense. Select * from expenses based on user id.
2. Once the expense is selected, get the receipt_id. 
3. Select * from receipt_id and get the info

From there use the necessary filters to filter out the values.

*/