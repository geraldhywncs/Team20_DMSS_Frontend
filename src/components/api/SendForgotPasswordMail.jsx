import React, { useState } from "react";
import Button from "../shared/Button";
import FormSection from "../shared/FormSection";
import callApi from "../shared/callAPI";
import { REACT_APP_apiHost } from "../../ENV";

const SendForgotPasswordMail = ({
  email,
  setShowErrorMessage,
  setShowLoadingMessage,
  setShowSuccessMessage,
}) => {
  const [result, setResult] = useState({ message: null, statusCode: null });

  const fetchData = async () => {
    const apiEndpoint = REACT_APP_apiHost + "/user/forgotPassword";
    const data = {
      email: email,
    };
    try {
      const response = await callApi(apiEndpoint, "POST", data);
      return response.status_code;
    } catch (error) {
      return null;
    }
  };
  const handleSendForgotEmailPassword = async () => {
    try {
      if (!email) {
        setShowErrorMessage(true);
        console.log("Fill your email");
      } else {
        setShowErrorMessage(false);
        setShowLoadingMessage(true);
        const statusCode = await fetchData();
        if (statusCode === 200) {
          setShowLoadingMessage(false);
          setShowSuccessMessage(true);
          console.log("Email sent");
        } else {
          setShowLoadingMessage(false);
          setShowErrorMessage(true);
          console.log("Email is not registed");
        }
      }
    } catch (error) {
      console.error("Error send email:", error);
    }
  };

  return (
    <FormSection col="1">
      <Button
        color={"blue"}
        text={"Send email"}
        onClick={handleSendForgotEmailPassword}
      />
    </FormSection>
  );
};

export default SendForgotPasswordMail;
