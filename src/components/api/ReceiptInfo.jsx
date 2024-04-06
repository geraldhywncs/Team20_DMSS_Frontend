import React, { useState, useEffect } from 'react';
import callApi from "../shared/callAPI";

function getReceiptData(receiptId) {
    const apiEndpoint = process.env.REACT_APP_apiHost + "/expenses/read_receipt_by_id";
    const data = { "receipt_id": receiptId };
    console.log(data);
    return callApi(apiEndpoint, "POST", data)
        .then(response => {
            console.log(response);
            console.log("Success", response);
            return response;
        })
        .catch(error => {
            console.log("Error when adding category: ", error);
            throw error;
        });
}

export { getReceiptData };
