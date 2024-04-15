import React, { useState } from 'react';
import Button from "./Button";
import DeleteExpenseConfirmation from "../pages/DeleteExpenseConfirmation";
import { resetTransaction } from '../../redux/transactionReducer';
import { useDispatch } from 'react-redux';

const DeleteTransactionButton = ({ receipt_id, handleExpenseDeleted }) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const dispatch = useDispatch();

    const handleButtonClick = async () => {
        if (!popupVisible){
            await dispatch(resetTransaction());
            setPopupVisible(true);
        }
    }; 

    const closePopup = () => {
        setPopupVisible(false)
    };

    return (
        <div className="button-container">
            <div class="flex justify-end">
                <div class="w-36">
                    <Button color={"red"} text={"Delete"} onClick={() => {
                        handleButtonClick();
                        handleExpenseDeleted(); // Call handleExpenseDeleted when deleting
                    }} className="red-btn"/>
                </div>
            </div>

            {popupVisible && (
                <div className="modal-container">
                    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center overflow-y-auto">
                        <div className="modal-overlay fixed inset-0 bg-black opacity-30" onClick={closePopup}></div>
                        <div className="modal-content rounded-lg shadow h-full p-4">
                            <div>
                            </div>
                            <DeleteExpenseConfirmation receipt_id={receipt_id} closePopup={closePopup} handleExpenseDeleted={handleExpenseDeleted}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteTransactionButton;