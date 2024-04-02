import React, { useState, useEffect } from 'react';
import "../../styles/pages/Transactions.css";
import { getExpenseData } from '../api/TransactionInfo'
import AddTransactionButton from "../shared/AddTransactionButton";
import DeleteTransactionButton from "../shared/DeleteTransactionButton";
import EditTransactionButton from './EditTransactionButton';

function TransactionView({ userId }) {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => { 
        const fetchData = async () => {
        try {
            const data = await getExpenseData(userId);
            console.log("Received data:", data);
            setReceipts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            console.error("Error fetching receipt data:", error);
      }
    };
     
    fetchData();
    }, [userId]);
  
      if (loading) {
          return <div>Loading...</div>;
      }
      if (error) {
          return <div>Error: {error.message}</div>;
      }

  return (
      <React.Fragment>
        <div className="section-container">
            <div class="section-header body-xlarge font-medium">Recent Transaction</div>
            <div headerName="Recent Transaction">
        </div>
            <div className="transactions-container"> {/*Main container*/}
              {/* <div className="transaction-date font-bold">{receipts[0].date}</div> Date div */}
                {receipts.map((receipt, index) => (
                <div className="transaction-container body-small font-small" key={index}>
                    <div className="icon-container">
                      <div className="icon-box">
                          <span className="material-icons" style={{ color: 'white'}}>cookie</span>
                      </div>
                    </div>
                    <div className="transaction-trans">
                      <div className="font-medium">{new Date(receipt.created_datetime).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                      </div>
                      <div className="body-large font-large font-bold">{receipt.title}</div>
                      <div className="font-medium ">{receipt.description}</div>
                    </div>
                    {/* <div className="transaction-amount font-bold">${receipt.expenses[0].share_amount}</div> */}
                    <div className="transaction-amount">
                        {receipt.expenses.map((expense, index) => (
                            <div key={index}>${expense.share_amount}</div>
                        ))}
                    </div>
                    <EditTransactionButton receipt_id={receipt.receipt_id} closePopup={() => {}}/>
                    <div style={{ marginRight: '10px' }}></div>
                    <DeleteTransactionButton receipt_id={receipt.receipt_id} closePopup={() => {}} className="red-btn"/>                  
                </div>
            ))}
            </div>
          </div>
              <div className="margin-top: 10px"></div>
              <AddTransactionButton userId={userId}/>
      </React.Fragment>
  );
}

export default TransactionView;
