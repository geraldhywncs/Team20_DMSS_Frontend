import React, {useEffect } from 'react';
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import FormLabel from "../shared/FormLabel";
import FormInput from "../shared/FormInput";

function SplitAmountInput({ setSplitAmount, splitAmount, handleSplitAmount, selectedGroupOption, amount }) {

    useEffect(() => {
        try {
            if(selectedGroupOption !== "" && amount !== "") {
                console.log("Fetching data...");
                const apiEndpoint = process.env.REACT_APP_apiHost + "/expenses/splitExpense";
                const data = {"groupId": selectedGroupOption, "amount": amount};
                callApi(apiEndpoint, "POST", data)
                    .then(response => {
                        if (response.status_code === '200') {
                            const splitAmount = response.expenses_per_ppl;
                            setSplitAmount(splitAmount);
                        } else {
                            console.log(response.message);
                        }
                    })
                    .catch(error => {
                        console.log("Error when split amount: ", error);
                    })

                } else {
                    setSplitAmount(amount);
                }
        } catch (error) {
            console.log("Error when split amount: ", error);
        }
    }, [amount, selectedGroupOption]);

    console.log("Component rendering...");

    return (
        <FormSection col="2" place="1">
        <FormLabel
            label={"Split Amont"}
        />
        <FormInput
            id = {"splitAmount"}
            placeholder = {"Split Amont"}
            type = {"text"}
            value={splitAmount}
            onChange={handleSplitAmount}
        />
    </FormSection>
    );
}

export default SplitAmountInput;
