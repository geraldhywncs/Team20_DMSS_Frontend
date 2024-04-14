import React, { useState, useEffect } from "react";
import GraphBar from "./GraphBar";

function GraphMonthLayout({ receiptData }) {
  const [currentMonthStartDate, setCurrentMonthStartDate] = useState(new Date());
  const [earliestExpenseDate, setEarliestExpenseDate] = useState(new Date());
  const [earliestAllowedDate, setEarliestAllowedDate] = useState(new Date());

  const moveToPreviousMonth = () => {
    const newDate = new Date(currentMonthStartDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonthStartDate(newDate);
  };

  const moveToNextMonth = () => {
    const newDate = new Date(currentMonthStartDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonthStartDate(newDate);
  };

  useEffect(() => {
    if (receiptData && receiptData.length > 0) {
      const dates = receiptData.map(receipt => new Date(receipt.created_datetime));
      const earliest = new Date(Math.min.apply(null, dates));
      setEarliestExpenseDate(earliest);
      setEarliestAllowedDate(new Date(earliest.getFullYear(), earliest.getMonth(), 1));
    }
  }, [receiptData]);
  const getWeeksInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const weeks = [];
    let currentDate = new Date(year, month, 1);
    
    while (currentDate.getDay() !== 1) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    while (currentDate.getMonth() === month) {
      const startOfWeek = new Date(currentDate);
      const endOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 6
      );
      weeks.push([startOfWeek, endOfWeek]);
      currentDate.setDate(currentDate.getDate() + 7); 
    }
    
    return weeks;
  };
  

  const concatExpenses = (receiptData) => {
    const monthlyExpenses = {};
  
    receiptData.forEach(receipt => {
      const createdDate = new Date(receipt.created_datetime);
      const month = createdDate.getMonth();
      const year = createdDate.getFullYear();
  
      if (year === currentMonthStartDate.getFullYear() && month === currentMonthStartDate.getMonth()) {
        const weeksInMonth = getWeeksInMonth(new Date(year, month, 1));
        const weekNumber = getWeekNumber(createdDate, weeksInMonth);
        const startDate = weeksInMonth[weekNumber - 1][0];
        const endDate = weeksInMonth[weekNumber - 1][1];
        const key = `Week ${weekNumber} ${formatDate(startDate)} - ${formatDate(endDate)}`;
  
        if (!monthlyExpenses[key]) {
          monthlyExpenses[key] = 0;
        }
        const totalExpenseAmount = receipt.expenses.reduce((total, expense) => total + parseFloat(expense.share_amount), 0);
  
        monthlyExpenses[key] += totalExpenseAmount;
      }
    });
  
    return monthlyExpenses;
  };
   
  const getWeekNumber = (date) => {
    const weeksInMonth = getWeeksInMonth(date);
    for (let i = 0; i < weeksInMonth.length; i++) {
      const [startOfWeek, endOfWeek] = weeksInMonth[i];
      if (date >= startOfWeek && date <= endOfWeek) {
        return i + 1;
      }
    }
    return 1;
  };
  
  const formatDate = (date) => {
    return `${date.getDate()}: ${getMonthName(date.getMonth())}`;
  };
  
  const getMonthName = (month) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
  };

  const monthlyExpenses = concatExpenses(receiptData);
  const totalMonthlyExpenses = Object.values(monthlyExpenses).reduce((total, amount) => total + parseFloat(amount), 0);
  console.log(monthlyExpenses, totalMonthlyExpenses)

return (
  <React.Fragment>
    <div className="dashboardHeaderButtonsContainer">
  <button
    className="dashboard-button"
    onClick={moveToPreviousMonth}
    style={{ visibility: currentMonthStartDate.getFullYear() <= earliestAllowedDate.getFullYear() && currentMonthStartDate.getMonth() <= earliestAllowedDate.getMonth() ? 'hidden' : 'visible' }}
  >
    &lt;
  </button>
  <div className="dashboard-header">
    {getMonthName(currentMonthStartDate.getMonth())} {currentMonthStartDate.getFullYear()}
  </div>
  <button className="dashboard-button" onClick={moveToNextMonth}>
  &gt;
  </button>
</div>

    <div className="bars-container">     
    {Object.keys(monthlyExpenses).length === 0 ? (
      <div className="dashboard-null">No Expenses</div>
      ) : (
        Object.keys(monthlyExpenses).map((key, index) => (
          <GraphBar
          key={index}
          height={(monthlyExpenses[key] / totalMonthlyExpenses) * 100} 
          value={key}
          amount={monthlyExpenses[key]}
          />
        ))
      )}
      </div>
  </React.Fragment>
);

}

export default GraphMonthLayout;
