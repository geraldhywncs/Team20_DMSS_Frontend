import React, { useState } from 'react';
import Button from "./Button";
import EditExpense from "../pages/EditExpense";

const EditTransactionButton = ({expenseId, receipt_id }) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const handleButtonClick = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false)
    };

    return (
        <div className="button-container">
            <div class="flex justify-end">
                <div class="w-36">
                    <Button className="w-32 h-12" text={"Edit"} onClick={handleButtonClick} />
                </div>
            </div>

            {popupVisible && (
                <div className="modal-container">
                    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center overflow-y-auto">
                        <div className="modal-overlay fixed inset-0 bg-black opacity-30" onClick={closePopup}></div>
                        <div className="modal-content rounded-lg shadow h-full p-4">
                            {/* <EditExpense receipt_id={receipt_id} closePopup={closePopup} /> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditTransactionButton;
