import React, { useState, useEffect } from 'react';
import "../../styles/pages/Transactions.css";
import { getExpenseData } from '../api/TransactionInfo'
import AddTransactionButton from "../shared/AddTransactionButton";
import DeleteTransactionButton from "../shared/DeleteTransactionButton";
import EditTransactionButton from '../shared/EditTransactionButton';
import LoadingMessage from "../shared/LoadingMessage";
import { useSelector } from 'react-redux';

function TransactionView({ userId, closePopup }) {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const transactionAdded = useSelector(state => state.transaction.transactionAdded);
    
    const handleExpenseDeleted = async () => {  
      try {
          console.log("Deleting expenses.................");
          const data = await getExpenseData(userId);
          setReceipts(data);
          setLoading(false);
          console.log("Receipts after deletion:", receipts);
      } catch (error) {
          setLoading(false); 
          console.error("Error fetching receipt data:", error);
          setError(error);
      }
  };

    useEffect(() => { 
      const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getExpenseData(userId);
            console.log("Received data trans View:", data);
            setReceipts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            console.error("Error fetching receipt data:", error);
      }
    }; 
      fetchData();
    }, [userId, transactionAdded]);

    const getMaterialIcon = (iconId) => {
      const iconMapping = {
        1: "commute",
        2: "flight_takeoff",
        3: "home",
        4: "shopping_cart",
        5: "sports_esports",
        6: "restaurant",
        7: "cake",
        8: "cruelty_free",
        9: "snowboarding",
        10:"fitness_center",
        11:"checkroom"
      };

      return iconMapping[iconId] || 'error';
    };

  return (
      <React.Fragment>
        {loading && <LoadingMessage message="Loading..." />}
        <div className="section-container">
            <div class="section-header body-xlarge font-medium">Recent Transaction</div>
            <div headerName="Recent Transaction">
        </div>
        <div className="transactions-container"> {/*Main container*/}
          {receipts.length === 0 ? (
            <div className="trans-null">No transactions available</div>
            ) : ( receipts.map((receipt, index) => (
            <div className="transaction-container body-small font-small" key={index}>
                <div className="icon-container">
                  <div className="icon-box" >
                    <span className = "material-icons" style={{ color: 'white'}}>
                      {getMaterialIcon(receipt.icon_id)}
                    </span>
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
                <div className="transaction-amount font-bold">
                  {receipt.group_id ? ( 
                        <div>${receipt.total_amount}</div>
                    ) : (
                        receipt.expenses.map((expense, index) => (
                            <div key={index}>${expense.converted_amount}</div>
                        ))
                    )}
                </div>
                <EditTransactionButton receipt_id={receipt.receipt_id} userId={userId}/>
                <div style={{ marginRight: '10px' }}></div>
                <DeleteTransactionButton receipt_id={receipt.receipt_id} className="red-btn" handleExpenseDeleted={handleExpenseDeleted}/>                  
            </div>
            )
        ))}
        </div>
      </div>
          <div className="margin-top: 10px"></div>
          <AddTransactionButton userId={userId} />
      </React.Fragment>
  );
}

export default TransactionView;