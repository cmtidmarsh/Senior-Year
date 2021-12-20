import React from 'react'
import logoWithBorderLogin from '../../assests/logoWithBorder.jpg';
import { Helmet } from "react-helmet";
import '../components.css';
import config from '../../utils/config';
const axios = require('axios').default;
const apiURL = config.baseUrl;
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
	const loginScript = () => {
		let history = useHistory();

		window.onload = function () {
			let usernameLogin = document.querySelector("#usernameLoginInput");
			let passwordLogin = document.querySelector("#passwordLoginInput");
			let loginButton = document.querySelector("#loginButton");

			let petName = document.querySelector("#petNameInput");
			let email = document.querySelector("#emailInput");
			let confirmEmail = document.querySelector("#confirmEmailInput");
			let password = document.querySelector("#passwordInput");
			let registerButton = document.querySelector("#registerPetButton");

			registerButton.addEventListener("click", event => {
				event.preventDefault();

				if (!petName.value || !password.value || !email.value) {
					alert("Please enter all the required information");
					return;
				};

				if (email.value !== confirmEmail.value) {
					alert("Email addresses do not match");
					return;
				};

				const accountDetails = {
					username: petName.value,
					firstname: petName.value,
					password: password.value,
				};

				// send the request to the login API with the data
				axios.post(`${apiURL}/profile/`, accountDetails)
					.then(response => {
						if (response.status === 'error') {
							alert("A user with that name already exists");
						} else {
							window.sessionStorage.setItem("username", accountDetails.username);
							window.sessionStorage.setItem("userId", response.data.data.id);
							history.push('/home');
						}
					})
					.catch(error => console.log(error));
			});

			loginButton.addEventListener("click", event => {
				event.preventDefault();

				// didnt give us info for something
				if (!usernameLogin.value || !passwordLogin.value) {
					alert("Please enter in all of your login info");
					return;
				};

				// put the data being sent in an object to be converted to JSON
				const loginCredentials = {
					username: usernameLogin.value,
					firstname: usernameLogin.value,
					password: passwordLogin.value,
				};

				// send the request to the login API with the data
				axios.get(`${apiURL}/profile/`)
					.then(response => {
						let profiles = response.data.data;
						let rightProfile;
						for (let i = 0; i < profiles.length; i++) {
							if (profiles[i].username === usernameLogin.value) {
								rightProfile = profiles[i];
								break;
							}
						}

						if (!rightProfile || response.status === 'error' || loginCredentials.password !== rightProfile.password) {
							alert("Invalid username or password");
						} else {
							window.sessionStorage.setItem("username", loginCredentials.username);
							window.sessionStorage.setItem("userId", rightProfile.id);
							history.push('/home');
						}
					})
					.catch(error => console.log(error));
			});
		}
	}

	return (
		<div>
			<Helmet>
				<meta charset="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>OnlyPets Login</title>

				<link href="client\src\components\bootstrap-5.1.1-dist" rel="stylesheet" crossorigin="anonymous" />
				<script dangerouslySetInnerHTML={{ __html: loginScript() }} type="text/javascript" />

			</Helmet>

			<main className="loginMain">

				<div className="form-signin">
					<form>

						{/*  Login: Title */}
						<div className="form-login">
							<h1>Login</h1>
						</div>
						{/* Login: Email Address  */}
						<div className="form-login">
							<label htmlFor="floatingInput">Username: </label>
							<input type="Name" className="form" id="usernameLoginInput" placeholder="Username" required />
						</div>
						{/* Login: Password  */}
						<div className="form-login">
							<label htmlFor="floatingPassword">Password: </label>
							<input type="password" className="form" id="passwordLoginInput" placeholder="Password" required />
						</div>

						{/* Login: Remember Me  */}
						<div className="form-login checkbox mb-3">
							<label><input type="checkbox" value="remember-me" /> Remember me</label>
						</div>

						{/* Login: Button */}
						<button className="btn btn-outline-success" type="button" id="loginButton">Sign in</button>

						{/* Login: Forgot Password Button */}
						<button className="btn btn-link btn-sm" type="button" id="forgotPasswordButton">Forgot Password</button>
					</form>
				</div>

				{/* Logo */}
				<div className="logo">
					<img src={logoWithBorderLogin} alt="Logo" className="logo" id="logoLogin" />
				</div>

				{/* Register */}
				<div className="form-registration">
					<form id="registerForm">

						{/* Register: title */}
						<div className="form-reg">
							<h1>Register</h1>
						</div>

						{/* Register: Pet's Name */}
						<div className="form-reg">
							<label htmlFor="floatingInput">Username:*</label>
							<input type="Name" className="form" id="petNameInput" placeholder="Username" required />

						</div>

						{/* Register: Email Address */}
						<div className="form-reg">
							<label htmlFor="floatingInput">Email Address: *</label>
							<input type="email" className="form" id="emailInput" placeholder="name@example.com" required />

						</div>
						{/* Register: Confirm Email Address */}
						<div className="form-reg">
							<label htmlFor="floatingInput">Confirm Email Address: *</label>
							<input type="email" className="form" id="confirmEmailInput" placeholder="name@example.com" required />

						</div>

						{/* Register: Password */}
						<div className="form-reg">
							<label htmlFor="floatingPassword">Password: *</label>
							<input type="password" className="form" id="passwordInput" placeholder="Password" required />

						</div>

						{/* Register: Date of Birth */}
						<div className="form-reg">
							<label htmlFor="birthday">Birthday: </label>
							<input type="date" id="birthday" name="birthday" required />

						</div>


						{/* Register : Security Question */}
						<div className="form-reg">
							<label htmlFor="Security_Question">Security Question: </label>

							<select name="security_question" id="security_q" required>
								<option value="question1">In what city were you born?</option>
								<option value="question2">What is the name of your favorite pet?</option>
								<option value="question3">What is your oldest sibling's middle name?</option>
								<option value="question4">What is your maternal grandmother's maiden name?</option>
								<option value="question5">What is your favorite sport?</option>
								<option value="question6">In what year was your father born?</option>

							</select>
						</div>
						{/* Register: Security Question Answer*/}
						<div className="form-reg">
							<label htmlFor="sq_answer">Answer: </label>
							<input type="answer" id="answer" name="answer" required />
						</div>


						{/* Register: Species of Pet */}
						<div className="form-reg">
							<label htmlFor="Type_of_Pet">Type of Pet: </label>
							<select name="Animal" id="animals" required>

								<option value="Mammal">Mammal</option>
								<option value="Bird">Bird</option>
								<option value="Reptiles">Reptiles</option>
								<option value="Ampibians">Ampibians</option>
								<option value="Fish">Fish</option>
								<option value="Invertebrates">Invertebrates</option>

							</select>
						</div>

						{/* Register: Breed */}
						<div className="form-reg">
							<label htmlFor="breed">Breed (if applicable): </label>
							<input type="breed" id="breed" name="breed" placeholder="ex. Pomeranian" />
						</div>

						{/* Register : Submit Button*/}
						<button className="btn btn-outline-success" type="button" id="registerPetButton">Register Your Pet!</button>
					</form>
				</div>
			</main >
		</div >
	)
}

export default LoginPage;