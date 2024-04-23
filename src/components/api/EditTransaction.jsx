import { useState, useEffect } from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import Button from "../shared/Button";

// function EditTransaction({ user_id, transactionData, setShowErrorMessage, setShowSuccessMessage, setShowLoadingMessage}) {
function EditTransaction({
  transactionTitle,
  selectedCategory,
  currency,
  shareAmtData,
  amount,
  splitAmount,
  description,
  selectedIconOption,
  selectedGroupOption,
  selectedRecurringFrequency,
  receiptData,
  setShowErrorMessage,
  setShowSuccessMessage,
  setShowLoadingMessage,
  receipt_id,
  userId
}) {
  // useEffect(() => {
  //   console.log('Transaction Title:', transactionTitle);
  //   console.log('Selected Category:', selectedCategory);
  //   console.log('Currency:', currency);
  //   // console.log('Currency:', currencyData);
  //   console.log('Amount:', amount);
  //   // console.log('share_amount:', shareAmtData);
  //   console.log('Description:', description);
  //   console.log('Selected Group Option:', selectedGroupOption);
  //   console.log('Split Amount:', splitAmount);
  //   console.log('Selected Recurring Frequency:', selectedRecurringFrequency);
  // }, [transactionTitle, selectedCategory, currency, amount, description, selectedGroupOption, splitAmount, selectedIconOption, selectedRecurringFrequency]);

  // const [result, setResult] = useState({ message: null, statusCode: null });

  const fetchData = async () => {
    const apiEndpoint = REACT_APP_apiHost + "/expenses/update";
    let data = {}
    console.log('selectedGroupOption: ' + selectedGroupOption)
    console.log('selectedRecurringFrequency: ' + selectedRecurringFrequency)
    
    if (selectedGroupOption === "" && selectedRecurringFrequency !== "") {
       data = {
        user_id: userId,
        title: transactionTitle,
        description: description,
        recur_id: selectedRecurringFrequency,
        share_amount: splitAmount,
        cat_id: selectedCategory,
        icon_id: selectedIconOption,
        // currency_id: currencyData
        from_currency: currency,
        receipt_id: receipt_id,
      };
      console.log('group empty!!'+ data)
    } else if (selectedRecurringFrequency === "" && selectedGroupOption !== "") {
        data = {
        user_id: userId,
        title: transactionTitle,
        description: description,
        group_id: selectedGroupOption,
        share_amount: splitAmount,
        cat_id: selectedCategory,
       icon_id: selectedIconOption,
        // currency_id: currencyData
        from_currency: currency,
        receipt_id: receipt_id,
        };
        console.log('rec empty!!'+ data)
    } else if (selectedRecurringFrequency === "" && selectedGroupOption === "") {
        data = {
          user_id: userId,
          title: transactionTitle,
          description: description,
          share_amount: splitAmount,
          cat_id: selectedCategory,
          icon_id: selectedIconOption,
          // currency_id: currencyData
          from_currency: currency,
          receipt_id: receipt_id,
        };
        console.log('Two Empty CALLED!!'+ data)
    } else {
        data = {
        user_id: userId,
        title: transactionTitle,
        description: description,
        group_id: selectedGroupOption,
        recur_id: selectedRecurringFrequency,
        share_amount: splitAmount,
        cat_id: selectedCategory,
        icon_id: selectedIconOption,
        // currency_id: currencyData
        from_currency: currency,
        receipt_id: receipt_id,        
      };
      console.log('FWEAFAWE CALLED!!'+ data)

    }

    console.log("EditTransaction data:", data);

    try {
      const response = await callApi(apiEndpoint, "POST", data);
      return response.status_code;
    } catch (error) {
      return null;
    }
  };

  const handleEditTransaction = async () => {
    try {
      if (
        !transactionTitle /*|| !selectedCategory || !currency  || !selectedIconOption || !splitAmount*/
      ) {
        // console.log("Please fill all fields");
        setShowErrorMessage(true);
      } else {
        setShowErrorMessage(false);
        setShowLoadingMessage(true);
        const statusCode = await fetchData();
        setShowLoadingMessage(false);
        // console.log("Edited Transaction");
        // console.log("ET data", data)

        if (statusCode == 200) {
          // console.log("response", response);
          setShowLoadingMessage(false);
          setShowSuccessMessage(true);
          // console.log("Transaction edited successfully");
        } else {
          setShowLoadingMessage(false);
          setShowErrorMessage(true);
          // console.log("Failed to edit transaction");
        }
      }
    } catch (error) {
      // console.error("Error editing transaction:", error);
      setShowLoadingMessage(false);
      setShowErrorMessage(true);
    }
  };

  return (
    <div>
      <FormSection>
        <div onClick={handleEditTransaction}>
          <Button color={"blue"} text={"Save"} />
        </div>
      </FormSection>
    </div>
  );
}

export default EditTransaction;
