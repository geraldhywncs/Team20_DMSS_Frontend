import callApi from "../shared/callAPI";
import { REACT_APP_apiHost } from "../../ENV";

function getReceiptData(receiptId) {
  const apiEndpoint = REACT_APP_apiHost + "/expenses/read_receipt_by_id";
  const data = { receipt_id: receiptId };
  console.log(data);
  return callApi(apiEndpoint, "POST", data)
    .then((response) => {
      console.log(response);
      console.log("Success", response);
      return response;
    })
    .catch((error) => {
      console.log("Error with ReceiptInfo: ", error);
      throw error;
    });
}

export { getReceiptData };
