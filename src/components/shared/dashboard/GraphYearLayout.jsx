import React from "react";
import GraphBar from "./GraphBar";
import constants from "../../../constants/constants";

function GraphYearLayout({ receiptData }) {
  const monthExpenses = Array.from({ length: 12 }, () => 0);

  receiptData.forEach(item => {
    const createdDate = new Date(item.created_datetime);
    const month = createdDate.getMonth();
    const totalExpense = item.expenses.reduce((acc, expense) => acc + expense.share_amount, 0);
    monthExpenses[month] += totalExpense;
  });

  const maxExpense = Math.max(...monthExpenses);

  return (
    <React.Fragment>
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
