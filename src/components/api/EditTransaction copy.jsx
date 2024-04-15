import React, { useState } from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import Button from "../shared/Button";
import { REACT_APP_apiHost } from "../../ENV";

function EditTransaction({
  transactionData,
  setShowErrorMessage,
  setShowSuccessMessage,
  setShowLoadingMessage,
}) {
  // console.log(transactionData);
  const {
    transactionTitle,
    selectedCategory,
    description,
    selectedIconOption,
    selectedGroupOption,
    splitAmount,
    selectCategoryName,
    selectedRecurringFrequency,
  } = transactionData;

  const handleEditTransaction = async () => {
    try {
      setShowErrorMessage(false);
      setShowLoadingMessage(true);

      const apiEndpoint = REACT_APP_apiHost + "/expenses/update";
      const data = {
        receipt_id: 67,
        title: transactionTitle,
        description: description,
        group_id: selectedGroupOption,
        recur_id: selectedRecurringFrequency,
        cat_id: selectedCategory,
        icon_id: selectedIconOption,
        category_name: selectCategoryName,
        share_amount: splitAmount,
        // "from_currency": currency,
        // Add other fields as needed
      };
      console.log(data);

      const response = await callApi(apiEndpoint, "POST", data);

      if (response && response.status_code === 200) {
        setShowLoadingMessage(false);
        setShowSuccessMessage(true);
        console.log("Transaction edited successfully");
      } else {
        setShowLoadingMessage(false);
        setShowErrorMessage(true);
        console.log("Failed to edit transaction");
      }
    } catch (error) {
      console.error("Error editing transaction:", error);
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
