import React from 'react';
import callApi from "../shared/callAPI"; // Assuming this is a utility function to make API calls
import FormSection from '../shared/FormSection';
import Button from '../shared/Button';

function SignUp({ name, username, password, setShowErrorMessage, setShowLoadingMessage, setErrorMessage, setUserId }) {
    const fetchData = async () => {
        const apiEndpoint = process.env.REACT_APP_apiHost + "/user/signup";
        const data = {
            "name": name,
            "username": username,
            "password": password
        };

        try {
            const response = await callApi(apiEndpoint, "POST", data);
            if (response.status_code === "200") {
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
            if (!name || !username || !password) {
                setErrorMessage('Please fill in all fields.');
                setShowErrorMessage(true);
            } else {
                setShowErrorMessage(false);
                setShowLoadingMessage(true);
                const statusCode = await fetchData();
                if (statusCode === "200") {
                    setShowLoadingMessage(false);
                    console.log('Sign up successful.');
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
