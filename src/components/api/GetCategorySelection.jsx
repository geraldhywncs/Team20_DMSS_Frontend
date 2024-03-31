import React, { useState, useEffect } from 'react';
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import FormLabel from "../shared/FormLabel";
import CategoryFormSelection from '../shared/CategoryFormSelection';

function GetCategorySelection({ selectedCategory, handleCategoryChange, fieldColour, userId, categoryAdded }) {

    const [optionsList, setOptionsList] = useState([]);

    useEffect(() => {
        try {
            const apiEndpoint = process.env.REACT_APP_apiHost + "/category/readCategory";
            const data = { "user_id": userId };

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
                    console.log("Error when reading categories: ", error);
                })
        } catch (error) {
            console.log("Error when reading categories: ", error);
        }
    }, [categoryAdded]);

    return (
        <FormSection col="2">
            <FormLabel
                label={"Category  (Required)"}
            />
            <CategoryFormSelection
                id={"category"}
                value={selectedCategory}
                onChange={handleCategoryChange}
                optionsList={optionsList}
                label={"Select Category"}
                fieldColour={fieldColour}
            />
        </FormSection>
    );
}

function addCategory(data, callback, setCategoryAdded) {
    const apiEndpoint = process.env.REACT_APP_apiHost + "/category/addCategory";
    callApi(apiEndpoint, "POST", data)
        .then(response => {
            callback(response);
            if (response.status_code === '200') {
                setCategoryAdded(true);
            }
        })
        .catch(error => {
            console.log("Error when adding category: ", error);
            callback({status_code: '500', message: 'Internal server error'});
        });
}

function deleteCategory(data, callback){
    const apiEndpoint = process.env.REACT_APP_apiHost + "/category/deleteCategory";
    callApi(apiEndpoint, "POST", data)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            console.log("Error when deleting category: ", error);
            callback({status_code: '500', message: 'Internal server error'});
        });
}

export { GetCategorySelection, addCategory, deleteCategory };
