import React, { useState } from "react";
import FormSection from "../shared/FormSection";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import "../../styles/pages/LoginSignUp.css";
import Login from "../api/Login";
import ErrorMessage from "../shared/ErrorMessage";
import LoadingMessage from "../shared/LoadingMessage";
import ForgotPassword from "./ForgotPassword";
import Header from "../shared/Header";
import SignUp from "../api/SignUp";
import SuccessMessage from "../shared/SuccessMessage";

const LoginSignUp = ({ setUserId }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [emailFieldColor, setEmailFieldColor] = useState("gray");
  const [loginPassword, setLoginPassword] = useState("");
  const [PasswordFieldColor, setPasswordFieldColor] = useState("gray");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loginTempEmail, setLoginTempEmail] = useState("");

  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  //addition for sign up page
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameFieldColor, setUsernameFieldColor] = useState("gray");
  const [signUpEmailFieldColor, setSignUpEmailFieldColor] = useState("gray");
  const [signUpPasswordFieldColor, setSignUpPasswordFieldColor] =
    useState("gray");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupTempEmail, setSignupTempEmail] = useState("");
  const [signupTempPassword, setSignupTempPassword] = useState("");
  const [firstNameFieldColor, setFirstNameFieldColor] = useState("gray");
  const [lastNameFieldColor, setLastNameFieldColor] = useState("gray");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameFieldColor("gray");

    const maxFirstNameLength = 20;

    if (e.target.value.length >= maxFirstNameLength) {
      const firstName = e.target.value.slice(0, maxFirstNameLength);
      setFirstName(firstName);
      setFirstNameFieldColor("red");
    } else {
      setFirstNameFieldColor("gray");
    }

    console.log(lastName);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameFieldColor("gray");

    const maxLastNameLength = 20;

    if (e.target.value.length >= maxLastNameLength) {
      const lastName = e.target.value.slice(0, maxLastNameLength);
      setLastName(lastName);
      setLastNameFieldColor("red");
    } else {
      setLastNameFieldColor("gray");
    }

    console.log(lastName);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameFieldColor("gray");

    const maxUsernameLength = 20;

    if (e.target.value.length >= maxUsernameLength) {
      const username = e.target.value.slice(0, maxUsernameLength);
      setUsername(username);
      setUsernameFieldColor("red");
    } else {
      setUsernameFieldColor("gray");
    }

    console.log(username);
  };

  const handleSucessMessage = () => {
    setShowSuccessMessage(false);
    setUsername("");
    setSignupTempPassword("");
    setSignupTempEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setEmail("");

    const checkbox = document.getElementById("reg-log");
    checkbox.checked = !checkbox.checked;
  };

  const handleSignUpEmailChange = (e) => {
    setSignUpEmailFieldColor("gray");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(e.target.value)) {
      setEmail(e.target.value);
      setSignUpEmailFieldColor("gray");
    } else {
      console.log("Empty");
      setEmail("");
      setSignUpEmailFieldColor("red");
    }
    setSignupTempEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordChange = (e) => {
    setSignupTempPassword(e.target.value);
    setSignUpPasswordFieldColor("gray");

    const maxPasswordLength = 20;
    const password = e.target.value.slice(0, maxPasswordLength);
    setPassword(password);

    if (e.target.value.length >= maxPasswordLength) {
      setSignUpPasswordFieldColor("red");
    } else {
      setSignUpPasswordFieldColor("gray");
    }

    console.log(password);
  };

  // end of sign up page
  const handleLoginEmail = (e) => {
    setLoginTempEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(e.target.value)) {
      console.log(e.target.value);
      setLoginEmail(e.target.value);
      setEmailFieldColor("gray");
    } else {
      console.log("Empty");
      setLoginEmail("");
      setEmailFieldColor("red");
    }
  };

  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div>
      <Header></Header>
      <div className="relative z-50">
        {showErrorMessage && (
          <ErrorMessage
            setShowErrorMessage={setShowErrorMessage}
            message={errorMessage}
          />
        )}
        {showSuccessMessage && (
          <SuccessMessage
            setShowSuccessMessage={handleSucessMessage}
            message={successMessage}
          />
        )}
        {showLoadingMessage && <LoadingMessage message={"Loading"} />}
        {showForgotPassword && (
          <ForgotPassword handleShowForgotPassword={handleShowForgotPassword} />
        )}
      </div>
      <div class="min-h-screen bg-indigo-500">
        <h6 class="mb-0 pb-3 text-l font-bold">
          <span class="mr-5">Log In </span>
          <span>Sign Up</span>
        </h6>

        <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
        <label for="reg-log"></label>
        <div class="card-3d-wrap mx-auto">
          <div class="card-3d-wrapper">
            {/* Login page */}
            <div class="card-front">
              <div class="center-wrap">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <h1 class="mb-0 pb-3 text-xl text-left font-bold text-indigo-500">
                    Welcome Back
                  </h1>
                  <FormSection col="1">
                    <FormLabel label={"Email"} />
                    <FormInput
                      id={"loginEmail"}
                      placeholder={"Email"}
                      type={"text"}
                      value={loginTempEmail}
                      onChange={handleLoginEmail}
                      fieldColour={emailFieldColor}
                    />
                  </FormSection>
                  <FormSection col="1">
                    <FormLabel label={"Password"} />
                    <FormInput
                      id={"loginPassword"}
                      placeholder={"Password"}
                      type={"password"}
                      value={loginPassword}
                      onChange={handleLoginPassword}
                      fieldColour={PasswordFieldColor}
                    />
                  </FormSection>
                  <FormSection col="1">
                    <div
                      className="text-indigo-600 underline"
                      onClick={handleShowForgotPassword}
                    >
                      <FormLabel label={"Forgot password?"} />
                    </div>
                  </FormSection>

                  <Login
                    class="min-h-screen bg-indigo-600"
                    email={loginEmail}
                    password={loginPassword}
                    setShowErrorMessage={setShowErrorMessage}
                    setShowLoadingMessage={setShowLoadingMessage}
                    setErrorMessage={setErrorMessage}
                    setUserId={setUserId}
                  />
                </div>
              </div>
            </div>
            {/* Sign Up page */}
            <div class="card-back">
              <div class="center-wrap">
                <div className="grid grid-cols-1 mb-4">
                  <h1 class="mb-0 pb-3 text-xl text-left font-bold text-indigo-500">
                    Sign Up
                  </h1>

                  {/* start of sign up page */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormSection col="1">
                      <FormLabel label={"First Name"} />
                      <FormInput
                        id="signupFirstName"
                        placeholder="First Name"
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        fieldColour={firstNameFieldColor}
                      />
                    </FormSection>
                    <FormSection col="1">
                      <FormLabel label={"Last Name"} />
                      <FormInput
                        id="signupLastName"
                        placeholder="Last Name"
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        fieldColour={lastNameFieldColor}
                      />
                    </FormSection>
                    <FormSection col="1">
                      <FormLabel label={"Username"} />
                      <FormInput
                        id="signupUsername"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        fieldColour={usernameFieldColor}
                      />
                    </FormSection>
                    <FormSection col="1">
                      <FormLabel label={"Password"} />
                      <FormInput
                        id="signupPassword"
                        placeholder="Password"
                        type="password"
                        value={signupTempPassword}
                        onChange={handlePasswordChange}
                        fieldColour={signUpPasswordFieldColor}
                      />
                    </FormSection>
                  </div>

                  <FormSection col="1">
                    <FormLabel label={"Email"} />
                    <FormInput
                      id="signupEmail"
                      placeholder="Email"
                      type="email"
                      value={signupTempEmail}
                      onChange={handleSignUpEmailChange}
                      fieldColour={signUpEmailFieldColor}
                    />
                  </FormSection>
                  <br />

                  <SignUp
                    class="min-h-screen bg-indigo-600"
                    firstname={firstName}
                    lastname={lastName}
                    email={email}
                    username={username}
                    password={password}
                    setShowErrorMessage={setShowErrorMessage}
                    setShowLoadingMessage={setShowLoadingMessage}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                    setUserId={setUserId}
                  />

                  {/* end of sign up page */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
