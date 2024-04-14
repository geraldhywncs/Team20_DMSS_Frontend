import React, { useState, useEffect } from "react";
import GraphBar from "./GraphBar";

const GraphDayLayout = ({ receiptData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [earliestDate, setEarliestDate] = useState(new Date());

  const moveToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const moveToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  useEffect(() => {
    if (receiptData && receiptData.length > 0) {
      const dates = receiptData.map(receipt => new Date(receipt.created_datetime));
      const earliest = new Date(Math.min.apply(null, dates));
      const nextDay = new Date(earliest);
      nextDay.setDate(nextDay.getDate());
      setEarliestDate(nextDay);
    }
  }, [receiptData]);

  const filterReceiptsByDate = (receiptData, currentDate) => {
    return receiptData.filter(receipt => {
      const receiptDate = new Date(receipt.created_datetime);
      return (
        receiptDate.getDate() === currentDate.getDate() &&
        receiptDate.getMonth() === currentDate.getMonth() &&
        receiptDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const dailyReceipts = filterReceiptsByDate(receiptData, currentDate);

  const concatExpenses = receiptData => {
    const dailyExpenses = {};

    receiptData.forEach(receipt => {
      const { category_name, expenses } = receipt;
      if (!dailyExpenses[category_name]) {
        dailyExpenses[category_name] = 0;
      }
      expenses.forEach(expense => {
        dailyExpenses[category_name] += expense.share_amount;
      });
    });

    return dailyExpenses;
  };

  const calculateTotalExpenses = expenses => {
    let total = 0;
    Object.values(expenses).forEach(amount => {
      total += parseFloat(amount);
    });
    return total;
  };

  const dailyExpenses = concatExpenses(dailyReceipts);
  const totalExpenses = calculateTotalExpenses(dailyExpenses);

  return (
    <React.Fragment>
      <div className="dashboardHeaderButtonsContainer">
        {currentDate.getTime() > earliestDate.getTime() && <button className="dashboard-button" onClick={moveToPreviousDay}>&lt;</button>}
        <div className="dashboard-header">{currentDate.toDateString()}</div>
        <button className="dashboard-button" onClick={moveToNextDay}>&gt;</button>
      </div>
      
      {dailyReceipts.length === 0 && <div className="dashboard-null">No Expenses</div>}

      <div className="bars-container">
        {Object.entries(dailyExpenses).map(([category_name, amount], index) => (
          <GraphBar
          key={index}
          height={(amount / totalExpenses) * 100}
          value={category_name}
          amount={amount}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default GraphDayLayout;
