import React from 'react'
import logWithBorder from '../../assests/logoWithBorder.jpg';
import dogHeader from '../../assests/dogHeader.jpg';
import { Helmet } from "react-helmet";
import '../components.css';
import config from '../../utils/config';
import textlogo from '../../assests/textLogo.jpg';
const axios = require('axios').default;
const apiURL = config.baseUrl;
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

const ProfileAbout = () => {
	const { user } = useParams()
	const [profileData, setProfileData] = useState({})
	let history = useHistory();

	useEffect(() => {
		axios.get(`${apiURL}/profile/id/${user}/`).then(response2 => {
			setProfileData(response2.data.data)
		})
	}, [])

	const script = () => {
		window.onload = function () {

			let searchInput = document.querySelector("#search");
			let searchAnchorTag = document.querySelector("#searchAnchor");

			searchAnchorTag.addEventListener("click", event => {
				event.preventDefault();
				var text = searchInput.value;

				axios.get(`${apiURL}/profile/id/${text}/`)
					.then(response => {
						if (response.data.status === "error") {
							alert(`No user with the username ${text} exists`);
						} else {
							history.push(`/profileAbout/${text}`);
						}

					})
					.catch(error => console.log(error));
			})
		}
	}

	let addSummary = (data) => {
		let defaultStr = "";
		let nameDefined = defaultStr
		let ageDefined = defaultStr
		let birthdayDefined = defaultStr
		let genderDefined = defaultStr

		if (data.firstname && data.lastname) {
			nameDefined = data.firstname + " " + data.lastname;
		}
		if (data.city) {
			ageDefined = data.city;
		}
		if (data.country) {
			birthdayDefined = data.country;
		}
		if (data.gender) {
			genderDefined = data.gender;
		}
		return (<text id="overViewText">{"Name: " + nameDefined}<br></br>{"Gender: " + genderDefined}<br></br>{"City: " + ageDefined}<br></br>{"Country: " + birthdayDefined}<br></br> </text>)
	}

	let addBio = (data) => {
		let defaultStr = "No bio added";
		let bioDefined = defaultStr

		if (data.bio) {
			bioDefined = data.bio;
		}
		return (<text id="introText">{bioDefined}</text>)
	}

	let addFacts = (data) => {
		let defaultStr = "";
		let nameDefined = defaultStr
		let ageDefined = defaultStr
		let birthdayDefined = defaultStr
		let genderDefined = defaultStr

		if (data.firstname && data.lastname) {
			nameDefined = data.firstname + " " + data.lastname;
		}
		if (data.city) {
			ageDefined = data.city;
		}
		if (data.birthdate) {
			birthdayDefined = data.birthdate;
		}
		if (data.gender) {
			genderDefined = data.gender;
		}
		return (<text id="overViewText">{"Name: " + nameDefined}<br></br>{"City: " + ageDefined}<br></br>{"Birthday: " + birthdayDefined}<br></br>{"Gender: " + genderDefined}<br></br> </text>)
	}

	return (
		<div>
			<Helmet>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="" />
				<title>OnlyPets About</title>
				<script dangerouslySetInnerHTML={{ __html: script() }} type="text/javascript" />
			</Helmet>

			<main class="entire-profilepage">
				{/*  Navbar */}
				<div class="navbar">
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<img src={textlogo} id="navBarTextLogo" />
						<a class="nav-link glyphicon glyphicon-home" href="/home" id="home"><span class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-user" href={`/profile/${window.sessionStorage.getItem("username")}/`} id="profile"> <span class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-wrench" href="/settings" id="settings"><span
							class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-bell" href={`/profile/${window.sessionStorage.getItem("username")}/`} id="notifications"> <span class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-envelope" href={`/messages/${window.sessionStorage.getItem("username")}/`} id="messages"> <span
							class="sr-only"></span></a>
						<a class="nav-link glyphicon glyphicon-log-out" href="/" id="logout"><span class="sr-only"></span></a>

						<div class="search-bar">
							<input id="search" type="search" class="form-control" />
						</div>

						<a id="searchAnchor" href="search.html"><span class="glyphicon glyphicon-search"></span></a>

						<div class="lightModeButton3-container">
							<button class="btn btn-dark" id="light-mode-button3" onClick={toggle_light_mode}>Dark Mode</button>
						</div>
					</nav>
				</div>

				<div class="everythingButNavBar">


					{/* Add script for "Edit Cover Photo Button" */}


					<div class="profile-container">
						<div class="coverphoto">
							<img src={dogHeader} class="cover-img" alt="small dog in a field" />
						</div>

						<div class="profile-navbar">
							<nav class="navbar navbar-expand-lg navbar-light bg-light">
								<a class="nav-link" href={`/profileAbout/${window.sessionStorage.getItem("username")}/`} id="profile-about">| About |</a>
								<a class="nav-link" href={`/profile/${window.sessionStorage.getItem("username")}/`} id="profile-posts">| Posts |</a>
								<a class="nav-link" href="/profileFriends" id="profile-friends">| Friends |</a>
								<a class="nav-link" href="/profilePictures" id="profile-photos">| Photos |</a>
							</nav>
							{/* <div class="card shadow p-3 mb-5 bg-white rounded" id="contentCard">
                        <div class="profile-options">
                            <a class="nav-link" href="#" id="profile-about"> About</a>
                            <a class="nav-link" href="#" id="profile-posts"> Posts</a>
                            <a class="nav-link" href="#" id="profile-friends"> Friends</a>
                            <a class="nav-link" href="#" id="profile-photos"> Photos</a>
                        </div> */}
						</div>
					</div>

					<div class="profile-details">
						<div class="card shadow p-3 mb-5 bg-white rounded" id="AboutCard">
							<div class="profiledetails-left">
								<div class="profiledetails-row">
									<div>
										<h3 id="AboutCardTitle">{"Overview of " + profileData.username}</h3>
										<button class="btn btn-light" id="editOverview">Edit</button>
										<br></br>
										<br></br>
										<br></br>
										{addSummary(profileData)}
									</div>
								</div>
							</div>
						</div>

						<div class="profiledetails-right">
							<div class="card shadow p-3 mb-5 bg-white rounded" id="IntroCard">
								<div>
									<h3 id="IntroCardTitle">Bio</h3>
									<button class="btn btn-light" id="editIntroButton">Edit</button>
									<br></br>
									<br></br>
									<br></br>
									{addBio(profileData)}
								</div>
							</div>
						</div>
					</div>

					<div class="profiledetails-bottom">
						<div class="card shadow p-3 mb-5 bg-white rounded" id="AnotherBioCard">
							<div class="btn-group-vertical" id="profileCardButtonGroup">
								<button class="btn btn-light" id="bioPlacesButton" onClick={placesButton} > Places Lived</button>
								<button class="btn btn-light" id="bioWorkButton" onClick={workButton}> Work & Education</button>
								<button class="btn btn-light" id="bioContactButton" onClick={contactButton}> Contact Information</button>
							</div>
							<div class="text-container">
								<text id="placesText"> South Bend, IN <br></br> Nashville, TN<br></br> SoCal, CA</text>
								<text id="workText"> Stay at home puppy</text>
								<text id="contactText"> cmtidmarsh@gmail.com <br></br> Twitch.tv/cmeichuan</text>
							</div>
						</div>
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

function placesButton() {
	var placesTextVar = document.getElementById("placesText");
	var workTextVar = document.getElementById("workText");
	var contactTextVar = document.getElementById("contactText");

	if (placesTextVar.style.display === "none") {
		placesTextVar.style.display = "block";
		workTextVar.style.display = "none";
		contactTextVar.style.display = "none";
	} else {
		placesTextVar.style.display = "none";
	}
}
function workButton() {

	var placesTextVar = document.getElementById("placesText");
	var workTextVar = document.getElementById("workText");
	var contactTextVar = document.getElementById("contactText");
	if (workTextVar.style.display === "none") {
		workTextVar.style.display = "block";
		placesTextVar.style.display = "none";
		contactTextVar.style.display = "none";
	} else {
		workTextVar.style.display = "none";
	}
}

function contactButton() {
	var placesTextVar = document.getElementById("placesText");
	var workTextVar = document.getElementById("workText");
	var contactTextVar = document.getElementById("contactText");
	if (contactTextVar.style.display === "none") {
		contactTextVar.style.display = "block";
		workTextVar.style.display = "none";
		placesTextVar.style.display = "none";
	} else {
		contactTextVar.style.display = "none";
	}
}




export default ProfileAbout;