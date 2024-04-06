// import React, { useState } from 'react';
import callApi from "../shared/callAPI";

function DeleteTransaction(receipt_id) {
    const apiEndpoint = process.env.REACT_APP_apiHost + "/expenses/delete";
    const data = { "receipt_id": receipt_id };

    // return callApi(apiEndpoint, "POST", data)
    return callApi(apiEndpoint, "DELETE", data)
        .then(response => {
            console.log("Success", receipt_id);
            return response.receipts;
        })
        .catch(error => {
            console.log("Error when deleting expense: ", error);
            throw error;
        });
}

export {DeleteTransaction};
