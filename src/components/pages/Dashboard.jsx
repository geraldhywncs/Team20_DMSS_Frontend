import GraphContainer from "../shared/dashboard/GraphContainer"
import React from "react";

const Dashboard = ({userId}) => {
  return (
    <React.Fragment>
      <div className="section-container">
        <div class="section-header body-xlarge font-medium">Dashboard</div>
        <GraphContainer userId={userId}></GraphContainer>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;