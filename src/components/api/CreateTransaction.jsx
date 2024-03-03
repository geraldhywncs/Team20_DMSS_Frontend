import React, { useState } from 'react';
import callApi from "../shared/callAPI";
import FormSection from '../shared/FormSection';
import Button from '../shared/Button';

function CreateTransactionButton() {
  const [buttonClick, setButtonClick] = useState(false);
  const [userId, setUserId] = useState('1');
  const [groupId, setGroupId] = useState('1');
  const [title, setTitle] = useState('Rental');
  const [description, setDescription] = useState('Pay monthly rental');
  const [catId, setCatId] = useState('1');
  const [recurExpense, setRecurExpense] = useState('Monthly');
  const [shareAmount, setShareAmount] = useState('500');
  const [amount, setAmount] = useState('1500');
  const [fromCurrency, setFromCurrency] = useState('1');

  const [result, setResult] = useState({ message: null, statusCode: null });

  const fetchData = async () => {
    if (!userId || !groupId || !title || !description || !catId || !recurExpense || !shareAmount || !amount || !fromCurrency) {
      setTimeout(() => {
        setResult({ message: null, statusCode: null });
      }, 1000);
      return;
    }

    const apiEndpoint = process.env.REACT_APP_apiHost + "/expenses/create";
    const data = {
      userId,
      groupId,
      title,
      description,
      catId,
      recurExpense,
      shareAmount,
      amount,
      fromCurrency
    };

    try {
      const response = await callApi(apiEndpoint, "POST", data);
      setResult({ message: response.message, statusCode: response.status_code });
    } catch (error) {
      setResult({ message: "Error when creating transaction", statusCode: null });
    }
  };

  const handleButtonClick = async () => {
    await fetchData();
  };

  return (
    <div>
      <FormSection col="2">
        <div onClick={handleButtonClick}>
          <Button color={"blue"} text={"Create Transaction"} />
        </div>
      </FormSection>
    </div>
  );
}

export default CreateTransactionButton;