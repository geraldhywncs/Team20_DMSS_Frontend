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

    useEffect(() => {
        // Populate form fields with existing transaction data
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

    // Handle form input changes
    const handleTransactionTitle = (e) => setTransactionTitle(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCurrency = (e) => setCurrency(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleIconOptionChange = (e) => setIconSelectedOption(e);
    const handleGroupChange = (e) => setGroupOption(e.target.value);
    const handleSplitAmount = (e) => setSplitAmount(e.target.value);
    const handleRecurringFrequencyChange = (e) => setRecurringFrequency(e.target.value);

    return (
        <div className="relative bg-white rounded-lg shadow p-4 overflow-y-auto">
            {/* Form content */}
            <form className="p-7 md:p-7">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Other form fields */}
                </div>
            </form>

            {/* Buttons */}
            <div className="px-7 md:px-7 py-0 grid gap-4 mb-4">
                <FormSection>
                    <Button
                        color={"white"}
                        text={"Scan Receipt"}
                        //onClick={handleButtonClick}
                    />
                </FormSection>
                <UpdateTransactionButton
                    transactionId={transactionData.id} // Pass transaction ID for updating
                    transactionTitle={transactionTitle}
                    selectedCategory={selectedCategory}
                    currency={currency}
                    description={description}
                    selectedIconOption={selectedIconOption}
                    selectedGroupOption={selectedGroupOption}
                    splitAmount={splitAmount}
                    selectedRecurringFrequency={selectedRecurringFrequency}
                    userId={userId}
                />
            </div>
        </div>
    );
}

export default UpdateTransactionPage;
