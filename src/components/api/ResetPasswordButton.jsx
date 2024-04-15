import React, { useEffect, useState } from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import Button from "../shared/Button";
import { REACT_APP_apiHost } from "../../ENV";

function ResetPasswordButton({
  email,
  token,
  newPassword,
  confirmPassword,
  setShowErrorMessage,
  setShowLoadingMessage,
  setErrorMessage,
  setShowSuccessMessage,
}) {
  const fetchData = async () => {
    const apiEndpoint = REACT_APP_apiHost + "/user/changePassword";
    console.log(email);
    console.log(newPassword);
    const data = {
      email: email,
      new_password: newPassword,
      token: token,
    };

    try {
      const response = await callApi(apiEndpoint, "POST", data);
      return response.status_code;
    } catch (error) {
      return null;
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        setErrorMessage("Please check on your password.");
        setShowErrorMessage(true);
      } else {
        if (newPassword !== confirmPassword) {
          setErrorMessage("Password is not match.");
          setShowErrorMessage(true);
        } else {
          setShowErrorMessage(false);
          setShowLoadingMessage(true);
          const statusCode = await fetchData();
          console.log("Reset Password...");
          console.log(statusCode);
          if (statusCode === "200") {
            setShowLoadingMessage(false);
            setShowSuccessMessage(true);
            console.log("Reset Successfully");
          } else {
            setShowLoadingMessage(false);
            setShowErrorMessage(true);
            setErrorMessage("Reset Failed");
          }
        }
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <FormSection col="1">
      <div onClick={handleResetPassword}>
        <Button color={"blue"} text={"Reset Password"} />
      </div>
    </FormSection>
  );
}

export default ResetPasswordButton;
