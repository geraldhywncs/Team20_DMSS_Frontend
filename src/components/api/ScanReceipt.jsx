import React, { useState } from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import Button from "../shared/Button";
import UploadWindow from "../shared/UploadWindow";
import { REACT_APP_apiHost } from "../../ENV";

function ScanReceipt({
  setShowLoadingMessage,
  setAmount,
  setSuccessScanReceiptMessage,
  setErrorScanReceiptMessage,
  setAmountFieldColour,
  setDescription,
}) {
  const [showUploadWindow, setShowUploadWindow] = useState(false);
  const [error, setError] = useState(null);

  const openUploadWindow = () => {
    console.log("button is clicked");
    setShowUploadWindow(true);
  };

  const closeUploadWindow = () => {
    setShowUploadWindow(false);
  };

  const handleFileUpload = async (file) => {
    const apiEndpoint = REACT_APP_apiHost + "/ocr";

    try {
      setShowLoadingMessage(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await callApi(apiEndpoint, "POST", formData);

      console.log("Response from API:", response.response);

      if ((response.ocr_status_code = 200)) {
        setAmount(response.receipt_amount);
        setDescription(response.receipt_text);
        setAmountFieldColour("gray");
        setSuccessScanReceiptMessage(true);
        setShowLoadingMessage(false);
      } else {
        setError("Invalid receipt amount.");
        setShowLoadingMessage(false);
        setErrorScanReceiptMessage(true);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred while uploading the file.");
      setShowLoadingMessage(false);
      setErrorScanReceiptMessage(true);
    }
  };

  return (
    <div>
      {showUploadWindow && (
        <UploadWindow
          onFileUpload={handleFileUpload}
          closeUploadWindow={() => setShowUploadWindow(false)}
        />
      )}
      <FormSection col="1">
        <div>
          <Button
            color={"white"}
            text={"Scan Receipt"}
            onClick={openUploadWindow}
          />
        </div>
      </FormSection>
    </div>
  );
}

export default ScanReceipt;
