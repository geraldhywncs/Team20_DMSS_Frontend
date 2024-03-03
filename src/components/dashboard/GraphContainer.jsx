import React, { useState } from "react";
import GraphDayLayout from "./GraphDayLayout";
import GraphWeekLayout from "./GraphWeekLayout";
import GraphMonthLayout from "./GraphMonthLayout";
import GraphYearLayout from "./GraphYearLayout";

const periods = ["day", "week", "month", "year"];

function GraphContainer() {
  const [selectedPeriod, setSelectedPeriod] = useState("year");

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    console.log(period);
  };

  const renderGraphData = () => {
    switch (selectedPeriod) {
      case "day":
        return <GraphDayLayout />;
      case "week":
        return <GraphWeekLayout />;
      case "month":
        return <GraphMonthLayout />;
      case "year":
        return <GraphYearLayout />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <div className="dashboard-header">2024</div>
      <div className="graph-container">{renderGraphData()}</div>

      <div className="bar-filterContainer">
        {periods.map((period) => (
          <button
            key={period}
            className={`bar-filterButton ${selectedPeriod === period ? "active" : ""}`}
            onClick={() => handlePeriodChange(period)}
          >
            {`Past ${period.charAt(0).toUpperCase() + period.slice(1)}`}
          </button>
        ))}
      </div>
    </React.Fragment>
  );
}

export default GraphContainer;
