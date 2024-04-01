import React, { useState, useEffect } from "react";
import GraphBar from "./GraphBar";
import constants from "../../../constants/constants";

function GraphYearLayout({ receiptData }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [earliestYear, setEarliestYear] = useState(null);

  useEffect(() => {
    if (receiptData && receiptData.length > 0) {
      const years = receiptData.map(receipt => new Date(receipt.created_datetime).getFullYear());
      const earliest = Math.min(...years);
      setEarliestYear(earliest);
    }
  }, [receiptData]);

  const moveToPreviousYear = () => {
    if (currentYear > earliestYear) {
      setCurrentYear(currentYear - 1);
    }
  };

  const moveToNextYear = () => {
    setCurrentYear(currentYear + 1);
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

  return (
    <React.Fragment>
     
      <div className="dashboardHeaderButtonsContainer">
        {currentYear > earliestYear && (
          <button className="dashboard-button" onClick={moveToPreviousYear}>&lt;</button>
        )}
        <div className="dashboard-header">{currentYear}</div>
        <button className="dashboard-button" onClick={moveToNextYear}>&gt;</button>
      </div>

      <div className="bars-container">
        {monthExpenses.every(expense => expense === 0) ? (
          <div className="dashboard-null">No Expenses</div>
          ) : (
            monthExpenses.map((totalExpense, index) => (
            <GraphBar
              key={index}
              height={(totalExpense / maxExpense) * 100} 
              value={constants.months[Object.keys(constants.months)[index]]}
              amount={totalExpense} 
            />
          ))
        )}
      </div>
    </React.Fragment>
  );
}

export default GraphYearLayout;
