import React, { useEffect, useState } from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import Button from "../shared/Button";
import { REACT_APP_apiHost } from "../../ENV";

function CreateTransactionButton({
  transactionTitle,
  selectedCategory,
  currency,
  description,
  selectedIconOption,
  selectedGroupOption,
  splitAmount,
  selectedRecurringFrequency,
  userId,
  setShowErrorMessage,
  setShowSuccessMessage,
  setShowLoadingMessage,
}) {
  useEffect(() => {
    console.log("Transaction Title:", transactionTitle);
    console.log("Selected Category:", selectedCategory);
    console.log("Currency:", currency);
    console.log("Description:", description);
    console.log("Selected Group Option:", selectedGroupOption);
    console.log("Split Amount:", splitAmount);
    console.log("Selected Recurring Frequency:", selectedRecurringFrequency);
  }, [
    transactionTitle,
    selectedCategory,
    currency,
    description,
    selectedGroupOption,
    splitAmount,
    selectedRecurringFrequency,
  ]);

  const [result, setResult] = useState({ message: null, statusCode: null });

  const fetchData = async () => {
    const apiEndpoint = REACT_APP_apiHost + "/expenses/create";

    const data = {
      user_id: userId,
      group_id: selectedGroupOption,
      title: transactionTitle,
      description: description,
      cat_id: selectedCategory,
      share_amount: splitAmount,
      from_currency: currency,
      icon_id: selectedIconOption,
      recur_id: selectedRecurringFrequency,
    };

    console.log(data);

    try {
      const response = await callApi(apiEndpoint, "POST", data);
      return response.status_code;
    } catch (error) {
      return null;
    }
  };

  const handleCreateTransaction = async () => {
    try {
      if (
        !transactionTitle ||
        !selectedCategory ||
        !currency ||
        !selectedIconOption ||
        !splitAmount
      ) {
        console.log("Please fill all fields");
        setShowErrorMessage(true);
      } else {
        setShowErrorMessage(false);
        setShowLoadingMessage(true);
        const statusCode = await fetchData();
        console.log("Created Transaction");

        if (statusCode === "200") {
          setShowLoadingMessage(false);
          setShowSuccessMessage(true);
          console.log("Transaction created successfully");
        } else {
          setShowLoadingMessage(false);
          //setShowSuccessMessage(false);
          setShowErrorMessage(true);
          console.log("Failed to create transaction");
        }
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <div>
      <FormSection>
        <div onClick={handleCreateTransaction}>
          <Button color={"blue"} text={"Create Transaction"} />
        </div>
      </FormSection>
    </div>
  );
}

export default CreateTransactionButton;
