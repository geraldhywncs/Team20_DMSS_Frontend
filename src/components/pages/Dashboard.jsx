import React from "react";
import GraphContainer from "../shared/dashboard/GraphContainer"

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="section-container">
        <div class="section-header body-xlarge font-medium">Dashboard</div>
        <GraphContainer></GraphContainer>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;

/* Dashboard layout

Api will retrieve the current transcations up till the current month.
Api needs to have the transactions value per month of the year.
If there are transactions within only for this year it will not render the << >> buttons.



 */
