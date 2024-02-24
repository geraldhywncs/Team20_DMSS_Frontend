import React, { useState, useEffect } from 'react';
import callApi from "../callAPI";

const SplitExpenseComponent = () => {
  const [groupId, setGroupId] = useState('');
  const [amount, setAmount] = useState('');
  const [expensesPerPpl, setExpensesPerPpl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [groupId, amount]);

  const fetchData = async () => {
    if (!groupId || !amount) {
      setTimeout(() => {
        setExpensesPerPpl(null);
      },1000);
      return;
    }
  
    const apiEndpoint = process.env.REACT_APP_apiHost + "/expenses/splitExpense";
    const data = { "groupId" : groupId, "amount" : amount };
  
    try {
      setLoading(true);
  
      const response = await callApi(apiEndpoint, "POST", data);
  
      if (response && response.expenses_per_ppl !== undefined) {
        const expensesPerPplValue = response.expenses_per_ppl;
        setExpensesPerPpl(expensesPerPplValue);
        console.log('Data from API:', expensesPerPplValue);
      } else {
        console.error('Invalid API response:', response);
      }
    } catch (error) {
      console.error('Error:', error.message);
  
      if (error.response && error.response.status === 500) {
        setExpensesPerPpl(null);
      } else {
        setExpensesPerPpl(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <label>Group ID:</label>
        <input type="text" value={groupId} onChange={(e) => setGroupId(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      {expensesPerPpl && (
        <div>
          <h2>Expenses per Person:</h2>
          <p>{expensesPerPpl}</p>
        </div>
      )}
    </div>
  );
}

export default SplitExpenseComponent;
