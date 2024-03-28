import React, { useState } from 'react';
import callApi from "../shared/callAPI";
import Button from '../shared/Button';

function DeleteTransactionButton({ transactionId, setShowErrorMessage, setShowSuccessMessage, setShowLoadingMessage }) {

  const [result, setResult] = useState({ message: null, statusCode: null });

  const deleteTransaction = async () => {
    const apiEndpoint = process.env.REACT_APP_apiHost + `/expenses/${transactionId}`;

    try {
      setShowLoadingMessage(true);
      const response = await callApi(apiEndpoint, "DELETE");
      setResult({ message: response.message, statusCode: response.status_code });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      setShowErrorMessage(true);
    } finally {
      setShowLoadingMessage(false);
    }
  };

  return (
    <div>
      {/* <Button color="red" text="Delete Transaction" onClick={deleteTransaction} /> */}
    </div>
  );
}

export default DeleteTransactionButton;
