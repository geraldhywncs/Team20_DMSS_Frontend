import React from "react";
import callApi from "../shared/callAPI";
import FormSection from "../shared/FormSection";
import Button from "../shared/Button";
import { REACT_APP_apiHost } from "../../ENV";

function SignUp({
  firstname,
  lastname,
  email,
  username,
  password,
  setShowErrorMessage,
  setShowLoadingMessage,
  setErrorMessage,
  setSuccessMessage,
  setShowSuccessMessage,
}) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fetchData = async () => {
    const apiEndpoint = REACT_APP_apiHost + "/user/createUser";
    const data = {
      user_name: username,
      email: email,
      password: password,
      first_name: firstname,
      last_name: lastname,
    };

    try {
      const response = await callApi(apiEndpoint, "POST", data);
      console.log(response);

      return response;
    } catch (error) {
      return null;
    }
  };

  const handleSignUp = async () => {
    console.log("email submitted: " + email);
    let isError = false;

    try {
      if (!firstname || !lastname || !username || !password || !email) {
        setErrorMessage("Please fill in all fields.");
        setShowErrorMessage(true);
        isError = true;
      }
      if (!passwordRegex.test(password)) {
        setErrorMessage(
          "Password must contain uppercase, lowercase, number, special character and at least 8 characters."
        );
        setShowErrorMessage(true);
        isError = true;
      }
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email");
        setShowErrorMessage(true);
        isError = true;
      }
      if (isError == false) {
        setShowErrorMessage(false);
        setShowLoadingMessage(true);
        const response = await fetchData();
        console.log("handlesignup response: " + response);
        if (response.user_status_code === 201) {
          setShowLoadingMessage(false);
          console.log("Sign up successful.");
          setSuccessMessage("Sign up successful! Please log in.");
          setShowSuccessMessage(true);
        } else if (response.user_status_code === 501) {
          setShowLoadingMessage(false);
          setShowErrorMessage(true);
          setErrorMessage(response.message);
        } else {
          setShowLoadingMessage(false);
          setShowErrorMessage(true);
          setErrorMessage("Sign up failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <FormSection col="1">
      <div onClick={handleSignUp}>
        <Button color={"blue"} text={"Sign Up"} />
      </div>
    </FormSection>
  );
}

export default SignUp;
