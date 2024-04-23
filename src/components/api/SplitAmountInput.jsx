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
  receipt
}) {
  let debounceTimeout;

  useEffect(() => {
    debounceTimeout = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimeout); // Clear the timeout on component unmount
  }, [amount, selectedGroupOption, receipt]);

  async function fetchData() {
    try {
      if (selectedGroupOption !== "") {
        if (amount !== "") {
          const apiEndpoint = REACT_APP_apiHost + "/expenses/splitExpense";
          const data = { groupId: selectedGroupOption, amount: amount };

          const response = await callApi(apiEndpoint, "POST", data);

          if (response.status_code === "200") {
            const newSplitAmount = response.expenses_per_ppl;
            setSplitAmount(newSplitAmount);
          } else {
            console.log(response.message);
          }
        } else {
          setSplitAmount("");
        }
      } else {
        setSplitAmount(amount);
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
