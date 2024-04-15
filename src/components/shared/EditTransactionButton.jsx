import React, { useState} from 'react';
import EditTransactionPage from '../pages/EditTransactionPage';
// import { getExpenseData } from '../api/TransactionInfo'
import { useDispatch } from 'react-redux';
import { resetTransaction } from '../../redux/transactionReducer';
import Button from "./Button";
import { getReceiptData } from '../api/ReceiptInfo';

const EditTransactionButton = ({ userId, receipt_id }) => {

    const [receiptData, setReceiptData] = useState([]);
    const [currencyData, setCurrencyData] = useState(null);
    const [currencyName, setCurrencyNameData] = useState(null);
    const [shareAmtData, setShareAmtData] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        console.log("EditTransButton", receipt_id);
        if(receipt_id) {
            setReceiptData(getReceiptData(receipt_id));
            console.log("this:", receiptData);
            getReceiptData(receipt_id) //Extracts data from read_expense API
                .then(data => {
                    console.log("thises", data);
                    if(data.status_code === '200'){
                        setReceiptData(data);
                        const { expenses } = data;
                        const AmtCurrData = expenses.map(expense => ({ 
                            share_amount: expense.share_amount,
                            currency_id: expense.currency_id,
                            currency_name: expense.currency_name
                        }));

                        setShareAmtData(expenses[0].share_amount);
                        setCurrencyData(expenses[0].currency_id);
                        setCurrencyNameData(expenses[0].currency_name);

                        // const firstShareAmount = AmtCurrData[0] ? AmtCurrData[0].share_amount : null;
                        
                        const { title, cat_id, currencyid, shareAmounts, icon_id, splitAmounts, descriptions, group_id, recur_id,
                            created_datetime, created_user_id, status_code, category_name, group_name, icon_name,recurring_name  } = receiptData;
                        
                        console.log("First expense share amount:", expenses[0].share_amount);
                        console.log("First expense currency name:", AmtCurrData[0].currency_name);
                        console.log("First expense currency id:", expenses[0].currency_id);
                        console.log("shareamtdat:ddd", shareAmtData);
                        console.log("scurencydat:ddd", currencyData);

                        // console.log("SA", firstShareAmount);
                        console.log("cID", cat_id);
                        console.log("here", receiptData);

                    } else {
                        console.log(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error fetching receipt data:', error);
                })
            }
        setPopupVisible(true);
        dispatch(resetTransaction());
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
            <div className="button-container">
                <div class="flex justify-end">
                    <div class="w-36">
                    <Button
                        color={"blue"}
                        text={"Edit"}
                        onClick={handleButtonClick}
                    />
                    </div>
                </div>
                
                {/* {popupVisible && ( */}
                <div className={`modal-container ${popupVisible ? 'visible' : 'hidden'}`}>
                <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center overflow-y-auto">
                    <div className="modal-overlay fixed inset-0 bg-black opacity-30" onClick={closePopup}></div>
                    <div className="modal-content rounded-lg shadow h-full p-4">
                        <EditTransactionPage closePopup={closePopup} userId={userId}
                            receipt_id={receipt_id} receiptData = {receiptData} 
                            currencyData = {currencyData} shareAmtData={shareAmtData} currencyName = {currencyName}/>
                    </div>
                </div>
                </div>
            </div>
    );
};

export default EditTransactionButton;