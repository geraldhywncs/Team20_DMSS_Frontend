import React, { useState, useEffect } from 'react';
import callApi from "../shared/callAPI";

function getExpenseData(userId) {
    const apiEndpoint = process.env.REACT_APP_apiHost + "/expenses/read";
    const data = { "user_id": userId };

    return callApi(apiEndpoint, "POST", data)
        .then(response => {
            console.log("Success", response.receipts);
            return response.receipts;
        })
        .catch(error => {
            console.log("Error when adding category: ", error);
            throw error;
        });
}

export { getExpenseData };
