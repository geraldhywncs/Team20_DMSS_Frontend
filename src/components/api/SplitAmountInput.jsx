import React, { useEffect } from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import FormLabel from "../shared/FormLabel";
import FormInput from "../shared/FormInput";
import { REACT_APP_apiHost } from "../../ENV";

function SplitAmountInput({
  setSplitAmount,
  splitAmount,
  handleSplitAmount,
  selectedGroupOption,
  amount,
  fieldColour,
  receipt_id,
  setShowLoadingMessage,
}) {
  let debounceTimeout;

  useEffect(() => {
    debounceTimeout = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimeout); // Clear the timeout on component unmount
  }, [amount, selectedGroupOption]);

  async function fetchData() {
    console.log("split amount called!! ", +receipt_id);
    console.log("group option received ", selectedGroupOption);
    try {
      // setShowLoadingMessage(true);
      if (!receipt_id) {
        if (selectedGroupOption !== "") {
          if (amount !== "") {
            const apiEndpoint = REACT_APP_apiHost + "/expenses/splitExpense";
            const data = { groupId: selectedGroupOption, amount: amount };

            const response = await callApi(apiEndpoint, "POST", data);

            if (response.status_code === "200") {
              const newSplitAmount = response.expenses_per_ppl;
              setSplitAmount(newSplitAmount);
              setShowLoadingMessage(false);
            } else {
              console.log(response.message);
              setShowLoadingMessage(false);
            }
          } else {
            setSplitAmount("");
            setShowLoadingMessage(false);
          }
        } else {
          setSplitAmount(amount);
          setShowLoadingMessage(false);
        }
      } else {
        // to account for EXISTING txn
        if (selectedGroupOption== "") {
          // to account for existing personal txn
          console.log("DETECTED PERSONAL TXN AS EXISTING");
          setSplitAmount(amount);
          setShowLoadingMessage(false);
        } else {
          // to account for existing group txn
          console.log("GROUP ID: " + selectedGroupOption);
          const apiEndpoint = REACT_APP_apiHost + "/expenses/splitExpense";
          const data = { groupId: selectedGroupOption, amount: amount };

          const response = await callApi(apiEndpoint, "POST", data);

          if (response.status_code === "200") {
            const newSplitAmount = response.expenses_per_ppl;
            setSplitAmount(newSplitAmount);
            setShowLoadingMessage(false);
          } else {
            console.log("ERROR: " + response);
            setShowLoadingMessage(false);
          }
        }
      }
    } catch (error) {
      console.log("Error when splitting amount: ", error);
    }
  }

  return (
    <FormSection col="2" place="1">
      <FormLabel label={"Split Amount"} />
      <FormInput
        id={"splitAmount"}
        placeholder={"Split Amount"}
        type={"text"}
        value={splitAmount}
        onChange={handleSplitAmount}
        fieldColour={fieldColour}
        readOnly={"readOnly"}
      />
    </FormSection>
  );
}

export default SplitAmountInput;
