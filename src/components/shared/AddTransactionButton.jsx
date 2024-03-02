import React, { useState } from 'react';
import Button from "./Button";
import AddTransactionPage from "../pages/AddTransactionPage";

const AddTransactionButton = () => {
    const [popupVisible, setPopupVisible] = useState(false);

    const handleButtonClick = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div className="button-container">
            <div class="flex justify-end">
                <div class="w-48">
                <Button
                    color={"blue"}
                    text={"Add Transaction"}
                    onClick={handleButtonClick}
                />
                </div>
            </div>
            
            {popupVisible && (
            <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center overflow-y-auto">
                <div className="modal-overlay fixed inset-0 bg-black opacity-30" onClick={closePopup}></div>
                <div className="modal-content rounded-lg shadow h-full p-4">
                    <AddTransactionPage closePopup={closePopup} />
                </div>
            </div>
)}
        </div>
    );
}

export default AddTransactionButton;
