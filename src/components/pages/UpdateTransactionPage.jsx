import React, { useState, useEffect } from 'react';
import Button from "../shared/Button";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import FormTextarea from "../shared/FormTextarea";
import FormSection from "../shared/FormSection";
import UpdateTransactionButton from "../api/UpdateTransaction";
import GetCurrencySelection from "../api/GetCurrencySelection";
import { GetCategorySelection, deleteCategory } from "../api/GetCategorySelection";
import GetGroupSelection from "../api/GetGroupSelection";
import SplitAmountInput from "../api/SplitAmountInput";
import IconSelection from "../api/IconSelection";
import GetRecurringFrequencySelection from "../api/GetRecurringFrequencySelection";

const UpdateTransactionPage = ({ closePopup, userId, transactionData }) => {
    const [transactionTitle, setTransactionTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [description, setDescription] = useState('');
    const [currency, setCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedIconOption, setIconSelectedOption] = useState(1);
    const [selectedGroupOption, setGroupOption] = useState('');
    const [splitAmount, setSplitAmount] = useState('');
    const [selectedRecurringFrequency, setRecurringFrequency] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (transactionData) {
            setTransactionTitle(transactionData.title || '');
            setSelectedCategory(transactionData.category || '');
            setDescription(transactionData.description || '');
            setCurrency(transactionData.currency || '');
            setAmount(transactionData.amount || '');
            setIconSelectedOption(transactionData.icon || 1);
            setGroupOption(transactionData.group || '');
            setSplitAmount(transactionData.splitAmount || '');
            setRecurringFrequency(transactionData.recurringFrequency || '');
        }
    }, [transactionData]);

    const handleTransactionTitle = (e) => setTransactionTitle(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCurrency = (e) => setCurrency(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleIconOptionChange = (e) => setIconSelectedOption(e);
    const handleGroupChange = (e) => setGroupOption(e.target.value);
    const handleSplitAmount = (e) => setSplitAmount(e.target.value);
    const handleRecurringFrequencyChange = (e) => setRecurringFrequency(e.target.value);
    const handleTransactionUpdatedSuccessButton  = (e) => {
        setShowSuccessMessage(false);
        closePopup();
    };

    return ( 
        <div className="relative bg-white rounded-lg shadow p-4 overflow-y-auto">
            <div className="flex items-center justify-between rounded-t dark:border-gray-600">
            <button
                type="button"
                className="text-black bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closePopup}>
                <span className="material-icons">
                    close
                </span>
            </button>
        </div>
        {showErrorMessage && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md">
                <p className="text-red-500">Failed to update transaction. Please check your inputs.</p>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setShowErrorMessage(false)}>
                Close
                </button>
            </div>
            </div>
        )}
        {showSuccessMessage && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-md shadow-md">
                    <p className="text-green-500">Transaction updated successfully!</p>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleTransactionUpdatedSuccessButton}>
                        Close
                    </button>
                </div>
            </div>
        )}
        <form className="p-7 md:p-7">
            <div className="grid grid-cols-2 gap-4 mb-4">

            </div>
        </form>
            <div className="px-7 md:px-7 py-0 grid gap-4 mb-4">
                <FormSection>
                    <Button
                        color={"white"}
                        text={"Scan Receipt"}
                        //onClick={handleButtonClick}
                    />
                </FormSection>
                <UpdateTransactionButton
                    //expenseId={transactionData.id} // Pass transaction ID for updating
                    expenseId={transactionData ? transactionData.id : null}
                    transactionTitle={transactionTitle}
                    selectedCategory={selectedCategory}
                    currency={currency}
                    description={description}
                    selectedIconOption={selectedIconOption}
                    selectedGroupOption={selectedGroupOption}
                    splitAmount={splitAmount}
                    selectedRecurringFrequency={selectedRecurringFrequency}
                    userId={userId}
                    setShowErrorMessage = {setShowErrorMessage}
                    setShowSuccessMessage = {setShowSuccessMessage}
                />
            </div>
        </div>
    );
}

export default UpdateTransactionPage;
