import React, { useState, useEffect } from "react";
import callApi from "../shared/callAPI";
import { REACT_APP_apiHost } from "../../ENV";

function getUserReceiptData(userId) {
  const apiEndpoint = REACT_APP_apiHost + "/expenses/read_receipts_by_user";
  const data = { user_id: userId };

  return callApi(apiEndpoint, "POST", data)
    .then((response) => {
      console.log("Success", response.receipts);
      return response.receipts;
    })
    .catch((error) => {
      console.log("Error when adding category: ", error);
      throw error;
    });
}

export { getUserReceiptData };
