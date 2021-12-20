import React from 'react'
import logWithBorder from '../../assests/logoWithBorder.jpg';
import { Helmet } from "react-helmet";
import '../components.css';
import config from '../../utils/config';
const axios = require('axios').default;
const apiURL = config.baseUrl;

const ForgotPassword = () => {
	return (
		<div>
			<Helmet>
				<meta charset="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>OnlyPets Forgot Password</title>

				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
					integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous" />
				<script dangerouslySetInnerHTML={{ __html: script() }} type="text/javascript" />


				{/* NEED SERVER */}
				{/*
				<script src="https://apis.google.com/js/platform.js" async defer></script>
				<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com" />
				*/}
			</Helmet>

			<main class="loginMain">
				<div class="forgotPass-logo">
					<img src={logWithBorder} alt="OnlyPets logo" id="forgotPassword-logo" />
				</div>

				<div class="form-forgotPass">
					{/* Forgot Password : Form */}
					<form class="forgotPasswordForm">
						<h1 id="forgotPassTitle"> Forgot Password?</h1>
						<label for="floatingInput">Email Address:*</label>
						<input type="email" class="form" placeholder="name@example.com" required />
						{/* Submit Button */}
						<div class="forgotButton"><button class="btn btn-outline-success" type="button" id="forgotPassButton">Submit</button></div>
					</form>
				</div>
			</main>
		</div>
	)
}

const script = () => {
	window.onload = function () {
	}
}

export default ForgotPassword;