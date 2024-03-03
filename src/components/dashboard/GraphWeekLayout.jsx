import React from "react";
import GraphBar from "./GraphBar";

function GraphWeekLayout() {

  const weekData = [
    { day: 1, totalExpense: 20 },
    { day: 2, totalExpense: 30 },
    { day: 3, totalExpense: 15 },
    { day: 4, totalExpense: 40 },
    { day: 5, totalExpense: 25 },
    { day: 6, totalExpense: 35 },
    { day: 7, totalExpense: 45 },
  ];

  return (
    <React.Fragment>
      {weekData.map((dayData) => (
        <GraphBar
          key={dayData.day}
          height={dayData.totalExpense}
          value={`Day ${dayData.day}`}
        />
      ))}
    </React.Fragment>
  );
}

export default GraphWeekLayout;
