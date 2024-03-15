import React, {useState} from 'react';
import FormSection from '../shared/FormSection';
import FormInput from '../shared/FormInput';
import FormLabel from '../shared/FormLabel';
import Button from '../shared/Button';
import SendForgotPasswordMail from '../api/SendForgotPasswordMail';
import SuccessMessage from '../shared/SuccessMessage'
import ErrorMessage from '../shared/ErrorMessage';
import LoadingMessage from '../shared/LoadingMessage';

const ForgotPassword = ({ handleShowForgotPassword}) => {
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [tempForgotPasswordEmail, setTempForgotPasswordEmail] = useState('');
    const [forgotPasswordEmailFieldColor, setForgotPasswordEmailFieldColor] = useState('gray');

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showLoadingMessage, setShowLoadingMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleForgotPasswordEmail = (e) => {
        setTempForgotPasswordEmail(e.target.value);
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (emailRegex.test(e.target.value)) {
			//console.log(e.target.value);
			setForgotPasswordEmail(e.target.value);
			setForgotPasswordEmailFieldColor('gray');
		} else {
			console.log('Empty');
			setForgotPasswordEmail('');
			setForgotPasswordEmailFieldColor('red');
		}
    };

    const handleSucessMessage = () => {
        console.log(false);
        setShowSuccessMessage(false);
    }

    const handleErrorMessage = () => {
        setShowErrorMessage(false);
    }

    return (
        <div>
            <div className="relative z-50">
            {showErrorMessage && (
				<ErrorMessage
					setShowErrorMessage={handleErrorMessage}
					message={"Email is not registered."}
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
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-8 rounded-md shadow-md">
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <h1 class="mb-0 pb-3 text-xl text-left font-bold text-indigo-500">Forgot Password</h1>
                        <FormSection col="1">
                            <FormLabel
                                label={"Email"}
                            />
                            <FormInput
                                id = {"forgotPasswordEmail"}
                                placeholder = {"Email"}
                                type = {"text"}
                                value={tempForgotPasswordEmail}
                                onChange={handleForgotPasswordEmail}
                                fieldColour = {forgotPasswordEmailFieldColor}
                            />
                        </FormSection>
                        <SendForgotPasswordMail
                            email={forgotPasswordEmail}
                            setShowErrorMessage={setShowErrorMessage}
                            setShowLoadingMessage={setShowLoadingMessage}
                            setShowSuccessMessage={setShowSuccessMessage}
                        />
                        <FormSection col="1">
                        <Button
                            color={"white"}
                            text={"Close"}
                            onClick={handleShowForgotPassword}
                        />
                        </FormSection>
                        
                        
                    </div>
                </div>
            </div>
        </div>
        );
}

export default ForgotPassword;
