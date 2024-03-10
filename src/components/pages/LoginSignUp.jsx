import React, {useState} from 'react';
import FormSection from "../shared/FormSection";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import Button from "../shared/Button";
import "../../styles/pages/LoginSignUp.css";

const LoginSignUp = () => {
	const [loginEmail, setLoginEmail] = useState('');
	const [emailFieldColor, setEmailFieldColor] = useState('gray');
	const [loginPassword, setLoginPassword] = useState('');
	const [PasswordFieldColor, setPasswordFieldColor] = useState('gray');

	const handleLoginEmail = (e) => {
        setLoginEmail(e.target.value);
    };

	const handleLoginPassword = (e) => {
        setLoginPassword(e.target.value);
    };
	return (
	<div class="min-h-screen bg-indigo-600">
		<h6 class="mb-0 pb-3 text-l font-bold"><span class="mr-5">Log In </span><span>Sign Up</span></h6>
		<input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
		<label for="reg-log"></label>
		
		<div class="card-3d-wrap mx-auto">
			
			<div class="card-3d-wrapper">
				{/* Login page */}
				<div class="card-front">
					<div class="center-wrap">
					<div className="grid grid-cols-1 gap-4 mb-4">
					<h1 class="mb-0 pb-3 text-xl text-left font-bold text-indigo-500">Welcome Back</h1>
					<FormSection col="1">
						<FormLabel
							label={"Email"}
						/>
						<FormInput
							id = {"loginEmail"}
							placeholder = {"Email"}
							type = {"text"}
							value={loginEmail}
							onChange={handleLoginEmail}
							fieldColour = {emailFieldColor}
						/>
					</FormSection>
					<FormSection col="1">
						<FormLabel
							label={"Password"}
						/>
						<FormInput
							id = {"loginPassword"}
							placeholder = {"Password"}
							type = {"text"}
							value={loginPassword}
							onChange={setLoginPassword}
							fieldColour = {PasswordFieldColor}
						/>
					</FormSection>
					<FormSection  col="1">
						<Button
							color={"blue"}
							text={"Login"}
							//onClick={handleButtonClick}
						/>
					</FormSection>
					
					</div>

					</div>
				</div>
				{/* Sign Up page */}
				<div class="card-back">
					<div class="center-wrap">
						<h4 class="mb-3 pb-3">Sign Up</h4>
							
					</div>
				</div>
			</div>
		</div>  	
	</div>

	);
};

export default LoginSignUp;
    