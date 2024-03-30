import React, { useState } from 'react';
import callApi from "../shared/callAPI";
import Button from "../shared/Button";
import DeleteTransactionButton from "../api/DeleteTransaction";


const DeleteTransactionPage = ({ closePopup }) => {
    const [expenseId, setexpenseId] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDelete = async () => {
        
        try {
            const response = await callApi(`/transactions/${expenseId}`, "DELETE");
            
            //Checking delete was successful anot
            if (response.status === 200) {
                setShowSuccessMessage(true);
            } else {
                setShowErrorMessage(true);
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            setShowErrorMessage(true);
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
                        <p className="text-red-500">Failed to delete transaction.</p>
                        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setShowErrorMessage(false)}>Close</button>
                    </div>
                </div>
            )}

            {showSuccessMessage && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <p className="text-green-500">Transaction deleted successfully!</p>
                        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}

            <form className="p-7 md:p-7">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="col-span-2">
                        <label htmlFor="expenseId" className="block text-sm font-medium text-gray-700">Expense ID</label>
                        <input
                            type="text"
                            id="expenseId"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={expenseId}
                            onChange={(e) => setexpenseId(e.target.value)}
                        />
                    </div>
                </div>
            </form>

            <div className="px-7 md:px-7 py-0 grid gap-4 mb-4">
            <p>Delete this transaction?</p>
            <Button color="red" text="Delete" onClick={handleDelete} />
            {/* <Button color="gray" text="Cancel" onClick={closePopup} /> */}
            </div>
        </div>
    );
}

export default DeleteTransactionPage;
