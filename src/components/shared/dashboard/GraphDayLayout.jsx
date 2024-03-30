import React from "react";
import GraphBar from "./GraphBar";
import DashboardFilter from "./DashboardFilter";

function GraphDayLayout({ receiptData }) {
  const concatExpenses = (receiptData) => {
    const dailyExpenses = {};

    receiptData.forEach(receipt => {
      const { title, expenses } = receipt;
      if (!dailyExpenses[title]) {
        dailyExpenses[title] = 0;
      }
      expenses.forEach(expense => {
        dailyExpenses[title] += expense.share_amount;
        console.log( dailyExpenses[title] + ":" + expense.share_amount);
      });
    });

    return dailyExpenses;
  };

  const calculateTotalExpenses = (expenses) => {
    let total = 0;
    Object.values(expenses).forEach(amount => {
      total += amount;
    });
    return total;
  };

  const dailyExpenses = concatExpenses(receiptData);
  const totalExpenses = calculateTotalExpenses(dailyExpenses);

  console.log(dailyExpenses);
  console.log('Total Expenses:', totalExpenses);

  return (
    <React.Fragment>
      <DashboardFilter period="day" receiptData={receiptData} />
      {Object.entries(dailyExpenses).map(([title, amount], index) => (
        <GraphBar
          key={index}
          height={(amount / totalExpenses) * 100}
          value={title}
          amount = {amount}
        />
      ))}
    </React.Fragment>
  );
}

export default GraphDayLayout;
