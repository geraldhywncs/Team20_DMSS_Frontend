import React from "react";
import GraphBar from "./GraphBar";

function GraphMonthLayout({ receiptData }) {
  const concatExpenses = (receiptData) => {
    const monthlyExpenses = {};
    const weeksInMonth = getWeeksInMonth(new Date());
  
    weeksInMonth.forEach((week, index) => {
      const startDate = week[0];
      const endDate = week[1];
      const weekNumber = index + 1;
      const key = `Week ${weekNumber}: ${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}`;
      monthlyExpenses[key] = 0;
    });
  
    receiptData.forEach(receipt => {
      const createdDate = new Date(receipt.created_datetime);
      const weekNumber = getWeekNumber(createdDate);
      const startDate = weeksInMonth[weekNumber - 1][0];
      const endDate = weeksInMonth[weekNumber - 1][1];
      const key = `Week ${weekNumber}: ${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}`;
      if (!monthlyExpenses[key]) {
        monthlyExpenses[key] = 0;
      }
      monthlyExpenses[key] += receipt.expenses.reduce((total, expense) => total + expense.share_amount, 0);
    });
  
    return monthlyExpenses;
  };
  

  const getWeeksInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const weeks = [];
  let currentDate = new Date(year, month, 1);
  
  while (currentDate.getMonth() === month) {
    const startOfWeek = new Date(currentDate);

    const endOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      Math.min(currentDate.getDate() + (6 - currentDate.getDay()), new Date(year, month + 1, 0).getDate())
    );
    
    weeks.push([startOfWeek, endOfWeek]);
    
    currentDate.setDate(endOfWeek.getDate() + 1);
  }
  
  return weeks;
};

  const getWeekNumber = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const dayOfMonth = date.getDate();
    const weekNumber = Math.ceil((dayOfMonth + dayOfWeek) / 7);
    return weekNumber;
  };

  const getStartDateOfWeek = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const dayOfMonth = date.getDate();
    const startDate = new Date(date.getFullYear(), date.getMonth(), dayOfMonth - dayOfWeek);
    return startDate;
  };

  const getEndDateOfWeek = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const dayOfMonth = date.getDate();
    const startDate = new Date(date.getFullYear(), date.getMonth(), dayOfMonth - dayOfWeek);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
    return endDate;
  };

  const monthlyExpenses = concatExpenses(receiptData);
  const totalMonthlyExpenses = Object.values(monthlyExpenses).reduce((total, amount) => total + amount, 0);

  return (
    <React.Fragment>
      {Object.keys(monthlyExpenses).map((key, index) => (
        <GraphBar
          key={index}
          height={(monthlyExpenses[key] / totalMonthlyExpenses) * 100} // Calculate the height based on the percentage of total expenses
          value={key}
          amount={monthlyExpenses[key]}
        />
      ))}
    </React.Fragment>
  );
}

export default GraphMonthLayout;
