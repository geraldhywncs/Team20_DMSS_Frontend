import React, { useState } from 'react';
import callApi from "../shared/callAPI";
import Button from "../shared/Button";
import DeleteTransactionButton from "../api/DeleteTransaction";


const DeleteTransactionPage = ({ closePopup }) => {
    const [transactionId, setTransactionId] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showLoadingMessage, setShowLoadingMessage] = useState(false);

    const handleDelete = async () => {
        setShowLoadingMessage(true);
        
        try {
            // Make an API call to delete the transaction with the specified ID
            const response = await callApi(`/transactions/${transactionId}`, "DELETE");
            
            // Check if the deletion was successful
            if (response.status === 200) {
                setShowSuccessMessage(true);
            } else {
                setShowErrorMessage(true);
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            setShowErrorMessage(true);
        } finally {
            setShowLoadingMessage(false);
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

            {showLoadingMessage && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="p-8 rounded-md">
                        <div className="flex items-center justify-center white-btn body-medium font-bold">
                            <span className="material-icons animate-spin h-5 w-5 mr-3">autorenew</span>
                            Processing...
                        </div>
                    </div>
                </div>
            )}

            <form className="p-7 md:p-7">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="col-span-2">
                        <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">Transaction ID</label>
                        <input
                            type="text"
                            id="transactionId"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                        />
                    </div>
                </div>
            </form>

            <div className="px-7 md:px-7 py-0 grid gap-4 mb-4">
                <Button
                    color="red"
                    text="Delete Transactionsss"
                    onClick={handleDelete}
                />
                <DeleteTransactionButton/>
            </div>
        </div>
    );
}

export default DeleteTransactionPage;
