import React, { useState, useEffect } from 'react';
import callApi from "../shared/callAPI";
import Button from '../shared/Button';
import FormSection from '../shared/FormSection';
import axios from "axios";

function UpdateTransactionButton({ expenseId, transactionTitle, selectedCategory, currency, description, selectedIconOption, selectedGroupOption, splitAmount, selectedRecurringFrequency, userId, setShowErrorMessage, setShowSuccessMessage, setShowLoadingMessage }) {

    const [result, setResult] = useState({ message: null, statusCode: null });

    const fetchData = async () => {
        const apiEndpoint = process.env.REACT_APP_apiHost + `/expenses/update/${expenseId}`; // Assuming the endpoint for updating a transaction
        const data = {
            "user_id": userId,
            "group_id": selectedGroupOption,
            "title": transactionTitle,
            "description": description,
            "cat_id": selectedCategory,
            "share_amount": splitAmount,
            "from_currency": currency,
            "icon_id": selectedIconOption,
            "recur_id": selectedRecurringFrequency
        };

        try {
            const response = await callApi(apiEndpoint, "PUT", data);
            return response.status_code;
        } catch (error) {
            return null;
        }
    };

    const handleUpdateTransaction = async () => {
        try {
            if (!transactionTitle || !selectedCategory || !currency || !selectedIconOption || !splitAmount) {
                console.log('Please fill all fields');
                setShowErrorMessage(true);
            } else {
                setShowErrorMessage(false);
                setShowLoadingMessage(true);
                //const statusCode = await fetchData();
                const statusCode = await axios.put(`/expenses/update/${expenseId}`, {
                    user_id: userId,
                    share_amount: splitAmount,
                });
                if (statusCode === "200") {
                    setShowLoadingMessage(false);
                    setShowSuccessMessage(true);
                    console.log('Transaction updated successfully');
                } else {
                    setShowLoadingMessage(false);
                    setShowErrorMessage(true);
                    console.log('Failed to update transaction');
                }
            }
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    return (
        <div>
            <FormSection>
                <div onClick={handleUpdateTransaction}>
                    <Button color={"Red"} text={"Update Transaction"} />
                </div>
            </FormSection>
        </div>
    );
}

export default UpdateTransactionButton;
