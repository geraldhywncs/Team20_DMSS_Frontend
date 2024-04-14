import React, { useState, useEffect } from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import FormLabel from "../shared/FormLabel";
import FormSelection from "../shared/FormSelection";
import { REACT_APP_apiHost } from "../../ENV";

function GetRecurringFrequencySelection({
  selectedRecurringFrequency,
  handleRecurringFrequencyChange,
  fieldColour,
}) {
  const [optionsList, setOptionsList] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  useEffect(() => {
    if (!apiCalled) {
      try {
        const apiEndpoint =
          REACT_APP_apiHost + "/recurringFrequency/readAllrecurringFrequencies";
        const data = {};
        callApi(apiEndpoint, "POST", data)
          .then((response) => {
            if (response.status_code === "200") {
              const options = response.recurring_frequency.map((entry) => ({
                value: entry.recurring_id,
                label: entry.recur_name,
              }));
              setOptionsList(options);
            } else {
              console.log(response.message);
            }
          })
          .catch((error) => {
            console.log("Error when reading currency: ", error);
          })
          .finally(() => {
            setApiCalled(true);
          });
      } catch (error) {
        console.log("Error when reading currency: ", error);
      }
    }
  }, [apiCalled]);

  return (
    <FormSection col="2">
      <FormLabel label={"Recurring Frequency"} />
      <FormSelection
        id={"recurringFrequency"}
        value={selectedRecurringFrequency}
        onChange={handleRecurringFrequencyChange}
        optionsList={optionsList}
        label={"No Recurring Frequency"}
        fieldColour={fieldColour}
      />
    </FormSection>
  );
}

export default GetRecurringFrequencySelection;
