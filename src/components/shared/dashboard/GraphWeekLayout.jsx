import React, { useState, useEffect } from "react";
import GraphBar from "./GraphBar";

function GraphWeekLayout({ receiptData }) {
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
  const [earliestExpenseDate, setEarliestExpenseDate] = useState(new Date());
  const [hasExpenses, setHasExpenses] = useState(true);

  const moveToPreviousWeek = () => {
    const newDate = new Date(currentWeekStartDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStartDate(newDate);
  };

  const moveToNextWeek = () => {
    const newDate = new Date(currentWeekStartDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStartDate(newDate);
  };

  useEffect(() => {
    if (receiptData && receiptData.length > 0) {
      const dates = receiptData.map(receipt => new Date(receipt.created_datetime));
      const earliest = new Date(Math.min.apply(null, dates));
      setEarliestExpenseDate(earliest);
    }
  }, [receiptData]);

  useEffect(() => {
    const weekExpenses = calculateTotalWeekExpenses(receiptData);
    setHasExpenses(weekExpenses > 0);
  }, [receiptData, currentWeekStartDate]);

  const calculateTotalWeekExpenses = (receiptData) => {
    let totalExpenses = 0;
    receiptData.forEach((receipt) => {
      receipt.expenses.forEach((expense) => {
        const expenseDate = new Date(receipt.created_datetime);
        if (isInCurrentWeek(expenseDate)) {
          totalExpenses += expense.share_amount;
        }
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
    const currDate = new Date(currentWeekStartDate);
    const firstDayOfWeek = currDate.getDate() - currDate.getDay() + (currDate.getDay() === 0 ? -6 : 1);
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(currDate.getFullYear(), currDate.getMonth(), firstDayOfWeek + i));
    }
    return days;
  };

  const isInCurrentWeek = (date) => {
    const currentWeek = getCurrentWeek();
    return currentWeek.some(day => day.toDateString() === date.toDateString());
  };

  const totalWeekExpenses = calculateTotalWeekExpenses(receiptData);
  const dailyExpenses = calculateDailyExpenses(receiptData, totalWeekExpenses);

  const getCurrentWeekHeader = () => {
    const startDate = currentWeekStartDate;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
  
    const startDayOfWeek = startDate.toLocaleString("en-us", { weekday: "short" });
    const startDayOfMonth = startDate.getDate();
    const startMonth = startDate.toLocaleString("en-us", { month: "short" });
    const startYear = startDate.getFullYear();
  
    const endDayOfWeek = endDate.toLocaleString("en-us", { weekday: "short" });
    const endDayOfMonth = endDate.getDate();
    const endMonth = endDate.toLocaleString("en-us", { month: "short" });
    const endYear = endDate.getFullYear();
  
    return `${startDayOfWeek} ${startDayOfMonth} ${startMonth} ${startYear} - ${endDayOfWeek} ${endDayOfMonth} ${endMonth} ${endYear}`;
  };
  

  return (
    <React.Fragment>
      <div className="dashboardHeaderButtonsContainer">
        {currentWeekStartDate.getTime() > earliestExpenseDate.getTime() && (
          <button className="dashboard-button" onClick={moveToPreviousWeek}>&lt;</button>
        )}
        <div className="dashboard-header">{getCurrentWeekHeader()}</div>
        <button className="dashboard-button" onClick={moveToNextWeek}>&gt;</button>
      </div>
      {!hasExpenses && <div className="dashboard-null">No Expenses</div>}

      <div className="bars-container">
        {Object.keys(dailyExpenses).map((key, index) => (
          dailyExpenses[key] > 0 && (
            <GraphBar
            key={index}
            height={(dailyExpenses[key] / totalWeekExpenses) * 100} 
            value={key}
            amount={dailyExpenses[key]} 
            />
          )
        ))}
      </div>
    </React.Fragment>
  );
}

export default GraphWeekLayout;
