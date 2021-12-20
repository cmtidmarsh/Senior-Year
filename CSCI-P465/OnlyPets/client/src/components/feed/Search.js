import React from 'react'
import logWithBorder from '../../assests/logoWithBorder.jpg';
import dogHeader from '../../assests/dogHeader.jpg';
import { Helmet } from "react-helmet";
import '../components.css';
import config from '../../utils/config';
import textLogo from '../../assests/textLogo.jpg';
const axios = require('axios').default;
const apiURL = config.baseUrl;

const Search = () => {
	return (
		<div>
			<Helmet>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="" />
				<title>OnlyPets Search</title>
				<script dangerouslySetInnerHTML={{ __html: script() }} type="text/javascript" />
			</Helmet>

			<main class="entireSearchpage">
				{/* Navbar */}
				<div class="navbar">
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<img src={textLogo} id="navBarTextLogo" />
						<a class="nav-link glyphicon glyphicon-home" href="homepage.html" id="home"><span
							class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-user" href="profile.html" id="profile"> <span
							class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-wrench" href="settings.html" id="settings"><span
							class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-bell" href="#" id="notifications"> <span
							class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-envelope" href="messages.html" id="messages"> <span
							class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-log-out" href="index.html" id="logout"><span
							class="sr-only"></span></a>


						<div class="search-bar">
							<input id="search" type="search" class="form-control" />
						</div>

						<a href="search.html"><span class="glyphicon glyphicon-search"></span></a>

						<div class="lightModeButton2-container">
							<button class="btn btn-dark" id="light-mode-button2" onClick={toggle_light_mode}>Dark Mode</button>
						</div>

					</nav>

				</div>



				{/* For ads (<br> = filler for now) */}
				<div class="ads-container">
					<h5 id="adTitleText">Advertisements</h5>
					<div class="internal-ad-container">
						<a class="nav-link" href="profile-about.html" id="create-ad-navlink">Create your own ad!<br /> (Rates and restrictions apply)</a>

					</div>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>

				<div class="search-container">
					<div class="card w-50 shadow p-3 mb-5 bg-white rounded" id="serchPostCard">
						</div>

							</div>

					<div class="filter-container">
						<div class="card shadow p-3 mb-5 bg-white rounded" id="filter-card-container">
							<h2>Filters</h2>

						</div>
					</div>



			</main>
		</div>
	)
}

const script = () => {
	window.onload = function () {
	}
}

function toggle_light_mode() {
	var app = document.getElementsByTagName("MAIN")[0];
	if (localStorage.lightMode == "dark") {
		localStorage.lightMode = "light";
		app.setAttribute("light-mode", "light");
	} else {
		localStorage.lightMode = "dark";
		app.setAttribute("light-mode", "dark");
	}
}

export default Search;