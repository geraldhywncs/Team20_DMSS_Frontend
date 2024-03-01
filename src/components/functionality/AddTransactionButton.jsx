import React, { useState } from 'react';
import Button from "../shared/Button";
import AddTransactionPage from "../pages/AddTransactionPage";

const AddTransactionButton = () => {
    const [addTransaction, setAddTransaction] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleButtonClick = () => {
        setAddTransaction(true);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        setAddTransaction(false);
    };

    return (
        <div className="button-container">
            {!addTransaction && (
                <Button
                    color={"blue"}
                    text={"Add Transaction"}
                    onClick={handleButtonClick}
                />
            )}
            
            {popupVisible && (
                <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
                    <div className="modal-overlay fixed inset-0 bg-black opacity-30" onClick={closePopup}></div>
                    <div className="modal-container bg-white w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg z-50">
                        <AddTransactionPage closePopup={closePopup} />
                    </div>
                </div>
            )}

        </div>
    );
}

export default AddTransactionButton;
