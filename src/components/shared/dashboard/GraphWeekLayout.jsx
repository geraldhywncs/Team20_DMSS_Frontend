import React from "react";
import GraphBar from "./GraphBar";

function GraphWeekLayout({ receiptData }) {
  const calculateTotalWeekExpenses = (receiptData) => {
    let totalExpenses = 0;
    receiptData.forEach((receipt) => {
      receipt.expenses.forEach((expense) => {
        totalExpenses += expense.share_amount;
      });
    });
    return totalExpenses;
  };

  const calculateDailyExpenses = (receiptData, totalWeekExpenses) => {
    const dailyExpenses = {};
    const currentWeek = getCurrentWeek();

    currentWeek.forEach((day) => {
      const dayOfWeek = day.toLocaleString("en-us", { weekday: "short" });
      const dayOfMonth = day.getDate();
      const monthOfYear = day.getMonth() + 1;
      const key = `${dayOfWeek} ${dayOfMonth}/${monthOfYear}`;

      let dailyExpensesTotal = 0;
      receiptData.forEach((receipt) => {
        const createdDate = new Date(receipt.created_datetime);
        if (
          createdDate.getDate() === dayOfMonth &&
          createdDate.getMonth() === monthOfYear - 1 && 
          createdDate.getFullYear() === day.getFullYear()
        ) {
          receipt.expenses.forEach((expense) => {
            dailyExpensesTotal += expense.share_amount;
          });
        }
      });

      dailyExpenses[key] = dailyExpensesTotal; 
    });

    return dailyExpenses;
  };

  const getCurrentWeek = () => {
    const currDate = new Date();
    const firstDayOfWeek = currDate.getDate() - currDate.getDay();
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(currDate.getFullYear(), currDate.getMonth(), firstDayOfWeek + i));
    }
    return days;
  };

  const totalWeekExpenses = calculateTotalWeekExpenses(receiptData);
  const dailyExpenses = calculateDailyExpenses(receiptData, totalWeekExpenses);

  return (
    <React.Fragment>
      {Object.keys(dailyExpenses).map((key, index) => (
        <GraphBar
          key={index}
          height={(dailyExpenses[key] / totalWeekExpenses) * 100} 
          value={key}
          amount={dailyExpenses[key]} 
        />
      ))}
    </React.Fragment>
  );
}

export default GraphWeekLayout;
