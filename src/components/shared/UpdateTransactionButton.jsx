import React, { useState } from 'react';
import Button from "./Button";
import UpdateTransactionPage from "../pages/UpdateTransactionPage";

const UpdateTransactionButton = ({ userId, transactionData }) => {
    const [popupVisible, setPopupVisible] = useState(false);

    const handleButtonClick = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div className="button-container">
            <div className="flex justify-end">
                <div className="w-48">
                    <Button
                        color={"blue"}
                        text={"Update Transaction"}
                        onClick={handleButtonClick}
                    />
                </div>
            </div>

            <div className={`modal-container ${popupVisible ? 'visible' : 'hidden'}`}>
                <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center overflow-y-auto">
                    <div className="modal-overlay fixed inset-0 bg-black opacity-30" onClick={closePopup}></div>
                    <div className="modal-content rounded-lg shadow h-full p-4">
                        <UpdateTransactionPage closePopup={closePopup} userId={userId} transactionData={transactionData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateTransactionButton;
