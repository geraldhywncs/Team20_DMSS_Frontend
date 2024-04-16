import React, { useState, useEffect } from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import FormLabel from "../shared/FormLabel";
import ImageSelector from "../shared/ImageSelector";
import { REACT_APP_apiHost } from "../../ENV";

function IconSelection({ selectedOption, handleIconOptionChange }) {
  const [optionsList, setOptionsList] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    if (!apiCalled) {
      try {
        const apiEndpoint = REACT_APP_apiHost + "/icon/readAllIcon";
        const data = {};
        callApi(apiEndpoint, "POST", data)
          .then((response) => {
            if (response.status_code === "200") {
              const options = response.icons.map((entry) => ({
                value: entry.icon_id,
                label: entry.icon_name,
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
      <FormLabel label={"Icon"} />
      <ImageSelector
        imageList={optionsList}
        selectedOption={selectedOption}
        handleOptionChange={handleIconOptionChange}
      />
    </FormSection>
  );
}

export default IconSelection;
