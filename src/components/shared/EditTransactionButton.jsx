import React, { useState} from 'react';
import EditTransactionPage from '../pages/EditTransactionPage'; // Import the UpdateTransactionPage component\
import { getReceiptData } from '../api/ReceiptInfo'
import { useDispatch } from 'react-redux';
import { resetTransaction } from '../../redux/transactionReducer';
import Button from "./Button";

const EditTransactionButton = ({userId, receipt_id, title, description }) => {

    const [receiptData, setReceiptData] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        console.log("EDB", receipt_id);
        if(receipt_id) {
            getReceiptData(receipt_id)
                .then(data => {
                    console.log("receipt Data:", data);
                    setReceiptData(data);
                    setPopupVisible(true);
                    dispatch(resetTransaction());
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
                            <EditTransactionPage closePopup={closePopup}
                                                userId={userId}
                                                receiptId={receipt_id}
                                                title={title}
                                                initialDescription={description}
                            />
                    </div>
                </div>
                </div>
            </div>
    );
};

export default EditTransactionButton;
