import React from "react";
import GraphBar from "./GraphBar";
import DashboardFilter from "./DashboardFilter";

const filterReceiptsByDate = (receiptData) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours to midnight for accurate comparison
  return receiptData.filter(receipt => {
    const receiptDate = new Date(receipt.created_datetime);
    receiptDate.setHours(0, 0, 0, 0); // Set hours to midnight for accurate comparison
    return receiptDate.getTime() === today.getTime();
  });
};

function GraphDayLayout({ receiptData, date }) {
  const dailyReceipts = filterReceiptsByDate(receiptData, date);
  console.log(dailyReceipts)

  const concatExpenses = (receiptData) => {
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

  const calculateTotalExpenses = (expenses) => {
    let total = 0;
    Object.values(expenses).forEach(amount => {
      total += amount;
    });
    return total;
  };
  

  const dailyExpenses = concatExpenses(dailyReceipts);
  const totalExpenses = calculateTotalExpenses(dailyExpenses);

  return (
    <React.Fragment>
      <DashboardFilter period="day" receiptData={receiptData} />
      {Object.entries(dailyExpenses).map(([category_name, amount], index) => (
        <GraphBar
          key={index}
          height={(amount / totalExpenses) * 100}
          value={category_name}
          amount = {amount}
        />
      ))}
    </React.Fragment>
  );
}

export default GraphDayLayout;
