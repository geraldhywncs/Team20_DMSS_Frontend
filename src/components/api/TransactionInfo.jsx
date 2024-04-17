import callApi from "../shared/callAPI";
import { REACT_APP_apiHost } from "../../ENV";

function getExpenseData(userId) {
  const apiEndpoint = REACT_APP_apiHost + "/expenses/read";
  const data = { user_id: userId };

  return callApi(apiEndpoint, "POST", data)
    .then((response) => {
      console.log("Success", response.receipts);
      return response.receipts;
    })
    .catch((error) => {
      console.log("Error with Transaction Info: ", error);
      throw error;
    });
}

export { getExpenseData };
