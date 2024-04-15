import React, { useState, useEffect } from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import FormLabel from "../shared/FormLabel";
import FormSelection from "../shared/FormSelection";
import { REACT_APP_apiHost } from "../../ENV";

function GetGroupSelection({
  selectedGroupOption,
  handleGroupChange,
  fieldColour,
  userId,
}) {
  const [optionsList, setOptionsList] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    if (!apiCalled) {
      try {
        const apiEndpoint = REACT_APP_apiHost + "/grouping/read";
        const data = { user_id: userId };
        callApi(apiEndpoint, "POST", data)
          .then((response) => {
            if (response.status_code === 200) {
              const options = response.grouping.map((entry) => ({
                value: entry.group_id,
                label: entry.group_name,
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
    <FormSection col="2" place="1">
      <FormLabel label={"Group"} />
      <FormSelection
        id={"group"}
        value={selectedGroupOption}
        onChange={handleGroupChange}
        optionsList={optionsList}
        label={"Personal"}
        fieldColour={fieldColour}
      />
    </FormSection>
  );
}

export default GetGroupSelection;
