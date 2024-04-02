/*src\components\pages*/
// import React, { useState, useEffect } from 'react';
// import Button from "../shared/Button";
// import { getExpenseData } from '../api/TransactionInfo';

// const EditExpense = ({ closePopup, userId }) => {

//     const [receipts, setReceipts] = useState([]);

//     const fetchData = async () => {
//         try {
//             const data = await getExpenseData(userId);
//             setReceipts(data);
//             console.log(receipts);
//         } catch (error) {
//             console.error("Error fetching receipt data:", error);
//       }
//     };

//     useEffect(() => {    
//         fetchData();
//       }, [userId]);

//     return (
//         <div className="relative bg-white rounded-lg shadow p-4 overflow-y-auto">
//             <React.Fragment>
//             <div className="section-container">
//             <div class="section-header body-xlarge font-medium">Edit Expense</div>
//                 <div className="transactions-container"> {/*Main container*/}
//                     {receipts.map((receipt, index) => (
//                     <div className="transaction-container body-small font-small" key={index}>
//                         <div className="transaction-trans">
//                             <div className="body-medium font-large font-bold">{receipt.title}</div>
//                             <div className="font-medium ">{receipt.description}</div> 
//                         </div>
//                             <dic className="transaction-amount">{receipt.share_amount}</dic>
//                     </div>
//                     ))}
//                 </div>
//             </div>
//             </React.Fragment>
//                 <Button color="gray" text="Cancel" onClick={closePopup} />
//             </div>
//     );
// }

// export default EditExpense;
