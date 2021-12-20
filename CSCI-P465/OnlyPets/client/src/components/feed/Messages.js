import React from 'react'
import logWithBorder from '../../assests/logoWithBorder.jpg';
import dogHeader from '../../assests/dogHeader.jpg';
import { Helmet } from "react-helmet";
import '../components.css';
import config from '../../utils/config';
import textlogo from '../../assests/textLogo.jpg';
import Message from './Message';
const axios = require('axios').default;
const apiURL = config.baseUrl;
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react'

const Messages = ({ setPage }) => {
	let history = useHistory();
	const [messages, setMessages] = useState([])

	let username = window.sessionStorage.getItem("username");
	useEffect(() => {
		axios.get(`${apiURL}/message/${username}/`)
			.then(response => {
				setMessages(response.data.data);
			})
			.catch(error => console.log(error))
	}, [])
	/*
		<div class="composeMessage-Container">
		<textarea placeholder="Type message.." name="msg" id="composeMessageTextArea" required></textarea>
	</div>
	
	<div class="messageButtons">
		<button class="btn btn-primary" onClick={send} id="sendButton"> Send</button>
	
	</div>
	<input type="text" id="searchForUsersToMessage" placeholder="Search"></input>
	*/


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

			let sendButton = document.querySelector("#sendButton");

			sendButton.addEventListener("click", event => {
				event.preventDefault();
				var text = document.querySelector('#composeMessageTextArea').value;
				var userToMsg = document.querySelector('#searchForUsersToMessage').value;

				axios.get(`${apiURL}/profile/id/${userToMsg}/`)
					.then(response => {

						if (response.data.status === "error") {
							alert(`No user with the username ${text} exists`);
						} else {
							const messageInfo = {
								fromProfile: window.sessionStorage.getItem("username"),
								toProfile: userToMsg,
								message_content: text,
								status: "sent"
							};
							console.log(messageInfo)

							axios.post(`${apiURL}/message/`, messageInfo)
								.then(response => {
									setMessages(messages.append(response.data.data))
								})
								.catch(error => console.log(error));
							alert("message sent")
						}

					})
					.catch(error => console.log(error));
			})
		}
	}

	return (
		<div>
			<Helmet>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="" />
				<title>OnlyPets Homepage</title>
				<script dangerouslySetInnerHTML={{ __html: script() }} type="text/javascript" />
			</Helmet>

			<main class="entire-messagepage">
				{/* Navbar */}
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

				<div class="messageTitle-container">
					<h1 id="messageTitle">Message</h1>
				</div>

				<div class="fullUserFiltering-Container">
					<div class="userFiltering-Container">
						<h3 id="userFilteringTitle">Search for Other Pets</h3>
						<input type="text" id="searchForUsersToMessage" placeholder="Search"></input>
						<div>
							<button id="searchForUsersButton" class="glyphicon glyphicon-search"></button>
						</div>

						<ul id="myUL">
							<li><a href="#"></a></li>
							<li><a href="#"></a></li>

							<li><a href="#"></a></li>
							<li><a href="#"></a></li>
						</ul>
					</div>
				</div>


				<div class="fullMessage-Container">

						<div class="allMessages-Container">
							{messages.map(message => <Message key={message.id} message={message} />)}
					</div>

					<div class="composeMessage-Container">
						<textarea placeholder="Type message.." name="msg" id="composeMessageTextArea" required></textarea>
					</div>

					<div class="messageButtons">
						<button class="btn btn-primary" id="sendButton"> Send</button>

					</div>
				</div>
			</main>
		</div>
	)
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

// function myFunction() {
// 	// Declare variables
// 	var input, filter, ul, li, a, i, txtValue;
// 	input = document.getElementById('myInput');
// 	filter = input.value.toUpperCase();
// 	ul = document.getElementById("myUL");
// 	li = ul.getElementsByTagName('li');

// 	// Loop through all list items, and hide those who don't match the search query
// 	for (i = 0; i < li.length; i++) {
// 	  a = li[i].getElementsByTagName("a")[0];
// 	  txtValue = a.textContent || a.innerText;
// 	  if (txtValue.toUpperCase().indexOf(filter) > -1) {
// 		li[i].style.display = "";
// 	  } else {
// 		li[i].style.display = "none";
// 	  }
// 	}
//   }

export default Messages;