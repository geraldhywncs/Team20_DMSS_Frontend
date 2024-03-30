import React, {useEffect, useState } from 'react';
import callApi from "../shared/callAPI";
import FormSection from '../shared/FormSection';
import Button from '../shared/Button';

function Login({email, password, setShowErrorMessage, setShowLoadingMessage, setErrorMessage, setUserId}) {
    const fetchData = async () => {
        const apiEndpoint = process.env.REACT_APP_apiHost + "/user/login";
        console.log(email);
        console.log(password);
        const data = {
          "email": email,
          "password": password
        };
    
        try {
          const response = await callApi(apiEndpoint, "POST", data);
          if(response.status_code == "200"){
            setUserId(response.user_id);
            localStorage.setItem('userId', response.user_id);
          }
          return response.status_code;
        } catch (error) {
          return null;
        }
      };

    const handleCreateTransaction = async () => {
      try {
        if (!email || !password) {
          setErrorMessage('Please check your email and password field.')
          console.log('Please check your email and password field.')
          setShowErrorMessage(true);
        } else {
          setShowErrorMessage(false);
          setShowLoadingMessage(true);
          const statusCode = await fetchData();
          console.log('Login...');
          console.log(statusCode);
          if (statusCode === "200") {
            setShowLoadingMessage(false);
            console.log('Login successfully.');
          } else {
            setShowLoadingMessage(false);
            setShowErrorMessage(true);
            setErrorMessage('Wrong email or password.')
          }
        }
      } catch (error) {
        console.error('Error creating transaction:', error);
      }
    };

    return (
      <FormSection  col="1">
        <div onClick={handleCreateTransaction}>
						<Button
							color={"blue"}
							text={"Login"}
						/>
        </div>
			</FormSection>
    );
}

export default Login;