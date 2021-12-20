import React from 'react'
import logWithBorder from '../../assests/logoWithBorder.jpg';
import { Helmet } from "react-helmet";
import '../components.css';
import config from '../../utils/config';
const axios = require('axios').default;
const apiURL = config.baseUrl;

const ResetPassword = () => {
	return (
		<div>
			<Helmet>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="" />
				<title>OnlyPets Reset Password</title>
				<script dangerouslySetInnerHTML={{ __html: script() }} type="text/javascript" />
			</Helmet>

			<main class="loginMain">
				{/* Forgot Password : Logo Display */}
				<div id="resetPassword-logo">
					<img src={logWithBorder} alt="OnlyPets logo" />
				</div>

				<form id="resetPassword-form">
					<div>
						<h1 id="resetPassTitle"> Reset Password</h1>
						<label for="floatingInput">New Password:</label>
						<input type="password" class="form" placeholder="password" required />
						<br />
						<label for="floatingInput">Confirm New Password:</label>
						<input type="password" class="form" placeholder="password" required />
						{/* Submit Button */}
						<div class="resetPasswordButton"><button class="btn btn-outline-success" type="button"
							id="forgotPassButton">Submit</button></div>
					</div>
					{/* Submit Button */}
					{/* <div class="resetPasswordButton"><button class="btn btn-outline-success" type="button"
								id="forgotPassButton">Submit</button></div> */}
				</form>
			</main>
		</div >
	)
}

const script = () => {
	window.onload = function () {
	}
}

export default ResetPassword;