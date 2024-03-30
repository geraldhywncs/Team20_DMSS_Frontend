import React from "react";
import GraphBar from "./GraphBar";

function GraphMonthLayout() {

  const weekData = [
    { weekNumber: 1, totalExpense: 200 },
    { weekNumber: 2, totalExpense: 300 },
    { weekNumber: 3, totalExpense: 150 },
    { weekNumber: 4, totalExpense: 400 },
  ];

  return (
    <React.Fragment>
      {weekData.map((week) => (
        <GraphBar
          key={week.weekNumber}
          height={week.totalExpense}
          value={`Week ${week.weekNumber}`}
        />
      ))}
    </React.Fragment>
  );
}

export default GraphMonthLayout;
