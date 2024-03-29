import React from 'react';
import callApi from "../shared/callAPI"; // Assuming this is a utility function to make API calls
import FormSection from '../shared/FormSection';
import Button from '../shared/Button';

function SignUp({ firstname, lastname, email, username, password, setShowErrorMessage, setShowLoadingMessage, setErrorMessage,setSuccessMessage,setShowSuccessMessage, setUserId }) {
    const fetchData = async () => {
        const apiEndpoint = process.env.REACT_APP_apiHost + "/user/createUser";
        const data = {
            "user_name": username,
            "email": email,
            "password": password,
            "first_name": firstname,
            "last_name": lastname
        };

        try {
            const response = await callApi(apiEndpoint, "POST", data);
            if (response.status_code === "201") {
                setUserId(response.user_id);
                localStorage.setItem('userId', response.user_id);
            }
            return response.status_code;
        } catch (error) {
            return null;
        }
    };

    const handleSignUp = async () => {
        try {
            if (!firstname || !lastname || !username || !password) {
                setErrorMessage('Please fill in all fields.');
                setShowErrorMessage(true);
            } else {
                setShowErrorMessage(false);
                setShowLoadingMessage(true);
                const statusCode = await fetchData();
                if (statusCode === "201") {
                    setShowLoadingMessage(false);
                    console.log('Sign up successful.');
                    setSuccessMessage('Sign up successful! Please log in.')
                    setShowSuccessMessage(true);
                } else {
                    setShowLoadingMessage(false);
                    setShowErrorMessage(true);
                    setErrorMessage('Sign up failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <FormSection col="1">
            <div onClick={handleSignUp}>
                <Button
                    color={"blue"}
                    text={"Sign Up"}
                />
            </div>
        </FormSection>
    );
}

export default SignUp;
