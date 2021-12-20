window.onload = function () {
	let emailLogin = document.querySelector("#emailLoginInput");
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

		// put the data being sent in an object to be converted to JSON
		const data = {
			username: email.value,
			password: password.value,
		};

		// send the request to the register API with the data
		fetch('http://localhost:5000/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(response => response.json())
			.then(json => {
				//console.log(json);

				if (json.message == "A user with this username already exists") {
					alert("A user with that name already exists");
				} else {
					alert("You have been registered and logged in");
				}
			});
	});

	loginButton.addEventListener("click", event => {
		event.preventDefault();

		// didnt give us info for something
		if (!emailLogin.value || !passwordLogin.value) {
			alert("Please enter in all of your login info");
			return;
		};

		// put the data being sent in an object to be converted to JSON
		const data = {
			username: emailLogin.value,
			password: passwordLogin.value,
		};

		// send the request to the login API with the data
		fetch('http://localhost:5000/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(response => response.json())
			.then(json => {
				//console.log(json);

				if (json.message == "Invalid User") {
					alert("Invalid username or password");
				} else {
					alert("You have been logged in");
				}
			});
	});
}