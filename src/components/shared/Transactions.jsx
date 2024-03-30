import "../../App.css";
import React from 'react';

function Transactions() {
  const transactions = [
    {
      date: " 28 Feb 2024",
      cat: "Food",
      description: "Pastry sprinkles marzipan tiramisu ipsum marzipan. Cream ipsum tiramisu croissant cake tiramisu.",
      amount: "-$2.90",
    },
    {
      date: " 25 Feb 2024",
      cat: "Transport",
      description: "Bus.",
      amount: "-$6.90",
    }
  ];

  return (
    //<div className="display:flex, align-items:center, justify-content: center"> {/*Main container*/}
      <div className="transactions-container"> {/*Main container*/}
      <div className="transaction-date font-bold">{transactions[0].date}</div> {/* Date div */}
        {transactions.map((transaction, index) => (
        <div className="transaction-container body-small font-small" key={index}>
            <div className="icon-container">
              <div className="icon-box">
                  <span className="material-icons" style={{ color: 'white'}}>cookie</span>
              </div>
            </div>
            <div className="transaction-trans">
              <div className="body-medium font-large font-bold">{transaction.cat}</div>
              <div className="font-medium ">{transaction.description}</div> 
            </div>
            <dic className="transaction-amount">{transaction.amount}</dic>
        </div>
      ))}
    </div>
  );
}

export default Transactions;
