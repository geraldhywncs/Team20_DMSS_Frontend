import React, { useState, useEffect } from 'react';
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import FormLabel from "../shared/FormLabel";
import FormSelection from "../shared/FormSelection";

function GetCategorySelection({ selectedCategory, handleCategoryChange}) {
    const [optionsList, setOptionsList] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [userId, setUserId] = useState("1");

    useEffect(() => {
        if (!apiCalled) {
            try {
                console.log("Fetching data...");
                const apiEndpoint = process.env.REACT_APP_apiHost + "/category/readCategory";
                const data = {"user_id": userId};
                callApi(apiEndpoint, "POST", data)
                    .then(response => {
                        if (response.status_code === '200') {
                            const options = response.categories.map((entry) => ({
                                value: entry.category_id,
                                label: entry.category_name,
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
            <FormLabel
                label={"Category"}
            />
            <FormSelection
                id = {"category"}
                value={selectedCategory}
                onChange={handleCategoryChange}
                optionsList={optionsList}
                label = {"Select Category"}
            />
        </FormSection>
    );
}

export default GetCategorySelection;
