import React, { useState } from 'react';
import Button from "../shared/Button";
import { DeleteTransaction } from '../api/DeleteTransaction';

const DeleteExpenseConfirmation = ({ closePopup, receipt_id }) => {

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDelete = async () => {
        try {
            await DeleteTransaction(receipt_id);
            setShowSuccessMessage(true);
            // console.log(receipt);
            console.log(receipt_id);
        } catch (error) {
            setShowErrorMessage(true);
            console.error("Error deleting expense:", error);
            // console.log(receipt);
            console.log(receipt_id);
        }
    };

    return (
        <div className="relative bg-white rounded-lg shadow p-4 overflow-y-auto">
            <div className="flex items-center justify-between rounded-t dark:border-gray-600">
                <button
                    type="button"
                    className="text-black bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closePopup}
                >
                    <span className="material-icons">close</span>
                </button>
            </div>

            {showErrorMessage && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <p className="text-red-500">Failed to delete expense.</p>
                        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setShowErrorMessage(false)}>Close</button>
                    </div>
                </div>
            )}

            {showSuccessMessage && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <p className="text-green-500">Expense deleted successfully!</p>
                        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
            <div className="px-7 md:px-7 py-0 grid gap-4 mb-4">
            <div className="body-large font-large font-bold">Delete this Expense?</div>
                <Button color="red" text="Delete" onClick={handleDelete} />
            {/* <Button color="gray" text="Cancel" onClick={closePopup} /> */}
            </div>
        </div>
    );
}

export default DeleteExpenseConfirmation;