import React, { useState } from 'react';
import Button from "./Button";
import DeleteTransactionPage from "../pages/DeleteTransactionPage"; // Import the page or component where you handle deletion

const DeleteTransactionButton = () => {
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
                        color={"red"} // Use a red color for delete action
                        text={"Delete Transactionsse"}
                        onClick={handleButtonClick}
                    />
                </div>
            </div>

            {/* Render delete transaction modal when popupVisible is true */}
            {popupVisible && (
                <div className="modal-container">
                    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center overflow-y-auto">
                        <div className="modal-overlay fixed inset-0 bg-black opacity-30" onClick={closePopup}></div>
                        <div className="modal-content rounded-lg shadow h-full p-4">
                            <DeleteTransactionPage closePopup={closePopup} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteTransactionButton;
