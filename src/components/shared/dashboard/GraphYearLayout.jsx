import React, { useState, useEffect } from "react";
import GraphBar from "./GraphBar";
import constants from "../../../constants/constants";

function GraphYearLayout({ receiptData }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [earliestYear, setEarliestYear] = useState(null);
  const [latestYear, setLatestYear] = useState(null);

  useEffect(() => {
    if (receiptData && receiptData.length > 0) {
      const years = receiptData.map(receipt => new Date(receipt.created_datetime).getFullYear());
      const earliest = Math.min(...years);
      const latest = Math.max(...years);
      setEarliestYear(earliest);
      setLatestYear(latest);
    }
  }, [receiptData]);

  const moveToPreviousYear = () => {
    if (currentYear > earliestYear) {
      setCurrentYear(currentYear - 1);
    }
  };

  const moveToNextYear = () => {
    if (currentYear < latestYear) {
      setCurrentYear(currentYear + 1);
    }
  };

  const filteredReceiptData = receiptData.filter(receipt => {
    const year = new Date(receipt.created_datetime).getFullYear();
    return year === currentYear;
  });

  const monthExpenses = Array.from({ length: 12 }, () => 0);

  filteredReceiptData.forEach(item => {
    const month = new Date(item.created_datetime).getMonth();
    const totalExpense = item.expenses.reduce((acc, expense) => acc + expense.share_amount, 0);
    monthExpenses[month] += totalExpense;
  });

  const maxExpense = Math.max(...monthExpenses);

// &lt; &gt;
  return (
    <React.Fragment>
      <div className="dashboardHeaderButtonsContainer">
        {currentYear > earliestYear && (
          <button className="dashboard-button" onClick={moveToPreviousYear}>&lt; Prev Year</button>
        )}
        <div className="dashboard-header">{currentYear}</div>
        {currentYear < latestYear && (
          <button className="dashboard-button" onClick={moveToNextYear}>Next Year &gt;</button>
        )}
      </div>
      
      {monthExpenses.map((totalExpense, index) => (
        <GraphBar
          key={index}
          height={(totalExpense / maxExpense) * 100} 
          value={constants.months[Object.keys(constants.months)[index]]}
          amount={totalExpense} 
        />
      ))}
    </React.Fragment>
  );
}

export default GraphYearLayout;

