import React, { useState, useEffect } from "react";
import Button from "../shared/Button";
import Section from "../shared/Section";
import AddTransactionButton from "../shared/AddTransactionButton";
import DeleteTransactionButton from "../shared/DeleteTransactionButton";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch data here and update state
    // Example fetch call
    fetchTransactions()
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions: ", error));
  }, []); // Empty dependency array to run effect only once

  // Function to fetch transactions data (example)
  const fetchTransactions = async () => {
    // Example fetch call
    const response = await fetch("/api/transactions");
    const data = await response.json();
    return data;
  };

  return (
    <>
      <Section headerName="Transactions testisdng">
        {/* Display transactions */}
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            {/* Render transaction details */}
            <p>{transaction.description}</p>
            <p>{transaction.amount}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </Section>
      <AddTransactionButton />
      <div><p></p></div>
      <DeleteTransactionButton />
    </>
  );
}

export default Transactions;
