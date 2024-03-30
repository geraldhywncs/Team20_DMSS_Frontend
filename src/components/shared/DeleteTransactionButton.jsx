import React, { useState } from 'react';
import Button from "./Button";
import DeleteTransactionPage from "../pages/DeleteTransactionPage";
import axios from 'axios';

const DeleteTransactionButton = ({expenseId, onDelete}) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const handleButtonClick = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false)
    };

    const handleDelete = () => {
        axios.post('/expenses/delete', { id: expenseId })
            .then(response => {
                console.log(response.data.message);
                onDelete();
            })
            .catch(error => {
                console.error('Error deleting transaction:', error);
            });
    };

    return (
        <div className="button-container">
            <div class="flex justify-end">
                <div class="w-48">
                    <Button color={"red"} text={"Delete Transactions"} onClick={handleButtonClick} />
                </div>
            </div>

            {popupVisible && (
                <div className="modal-container">
                    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center overflow-y-auto">
                        <div className="modal-overlay fixed inset-0 bg-black opacity-30" onClick={closePopup}></div>
                        <div className="modal-content rounded-lg shadow h-full p-4">
                            <div>
                            </div>
                            <DeleteTransactionPage closePopup={closePopup} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteTransactionButton;
