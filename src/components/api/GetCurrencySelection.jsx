import React, { useState, useEffect } from 'react';
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import FormLabel from "../shared/FormLabel";
import FormSelection from "../shared/FormSelection";

function GetCurrencySelection({ currency, handleCurrency }) {
    const [optionsList, setOptionsList] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);

    useEffect(() => {
        if (!apiCalled) {
            try {
                console.log("Fetching data...");
                const apiEndpoint = process.env.REACT_APP_apiHost + "/currency/readAllCurrencies";
                const data = {};
                callApi(apiEndpoint, "POST", data)
                    .then(response => {
                        if (response.status_code === '200') {
                            const options = response.currency.map((entry) => ({
                                value: entry.currency_id,
                                label: `${entry.code} (${entry.name})`,
                              }));
                            setOptionsList(options);
                        } else {
                            console.log(response.message);
                        }
                    })
                    .catch(error => {
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

    console.log("Component rendering...");

    return (
        <FormSection col="2" place="1">
            <FormLabel label={"Currency"} />
            <FormSelection
                id={"currency"}
                value={currency}
                onChange={handleCurrency}
                optionsList={optionsList}
                label={"Select Currency"}
            />
        </FormSection>
    );
}

export default GetCurrencySelection;
