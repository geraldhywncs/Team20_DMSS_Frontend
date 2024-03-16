import React, { useState, useEffect} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../shared/ErrorMessage';
import LoadingMessage from '../shared/LoadingMessage';
import Header from '../shared/Header';
import FormSection from "../shared/FormSection";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import ResetPasswordButton from '../api/ResetPasswordButton';
import SuccessMessage from '../shared/SuccessMessage'


const ResetPassword = ({}) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [tempNewPassword, setTempNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordFieldColor, setNewPasswordFieldColor] = useState('gray');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(searchParams.get("email"));
    setToken(searchParams.get("token"));
  }, [searchParams]);

  const handleNewPassword = (e) => {
    setTempNewPassword(e.target.value);
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,}$/;
    if (passwordRegex.test(e.target.value)) {
        console.log(e.target.value);
        setNewPassword(e.target.value);
		setNewPasswordFieldColor('gray');
    } else {
        setNewPassword('');
		setNewPasswordFieldColor('red');
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSucessMessage = () => {
    setShowSuccessMessage(false);
    navigate("/");
  }

  return (
    <div>
       <div>
		<Header></Header>
		<div className="relative z-50">
			{showErrorMessage && (
				<ErrorMessage
					setShowErrorMessage={setShowErrorMessage}
					message={errorMessage}
				/>
			)}
			{showLoadingMessage && (
				<LoadingMessage
					message={"Loading"}
				/>
			)}
      {showSuccessMessage && (
				<SuccessMessage
          setShowSuccessMessage={handleSucessMessage}
          message={"Email sent successfully."}
        />
			)}

		</div>
		<div class="min-h-screen bg-indigo-500">
			<div class="mb-0 pb-3 text-l font-bold"></div>
			<div class="card-3d-wrap mx-auto">
				<div class="card-3d-wrapper">
					<div class="card-front">
						<div class="center-wrap">
						<div className="grid grid-cols-1 gap-4 mb-4">
						    <h1 class="mb-0 pb-3 text-xl text-left font-bold text-indigo-500">Change Password</h1>
                  <FormSection col="1">
                      <FormLabel
                          label={"New Password"}
                      />
                      <FormInput
                          id = {"newPassword"}
                          placeholder = {"New Password"}
                          type = {"password"}
                          value={tempNewPassword}
                          onChange={handleNewPassword}
                          fieldColour = {newPasswordFieldColor}
                      />
                      <span class="text-xs">
                          (More than 8 character with at least 1 Uppercase, 1 Lowercase, 1 Number and 1 Symbol)
                      </span>
                  </FormSection>
                  <FormSection col="1">
                      <FormLabel
                          label={"Confirm Password"}
                      />
                      <FormInput
                          id = {"confirmPassword"}
                          placeholder = {"Confirm Password"}
                          type = {"password"}
                          value={confirmPassword}
                          onChange={handleConfirmPassword}
                          fieldColour = {'gray'}
                      />
                  </FormSection>
                  <ResetPasswordButton
                    setShowErrorMessage={setShowErrorMessage}
                    setShowLoadingMessage={setShowLoadingMessage}
                    email={email}
                    newPassword={newPassword}
                    confirmPassword={confirmPassword}
                    setErrorMessage={setErrorMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                    token={token}
                  />
						</div>
					</div>

				</div>
			</div>  	
		</div>
	</div>
    </div>
    </div>
  );
}

export default ResetPassword;
