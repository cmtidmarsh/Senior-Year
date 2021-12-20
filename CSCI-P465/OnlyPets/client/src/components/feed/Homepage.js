import React from 'react'
import logWithBorder from '../../assests/logoWithBorder.jpg';
// import dogHeader from '../../assests/dogHeader.jpg';
import textlogo from '../../assests/textLogo.jpg'
import { Helmet } from "react-helmet";
import '../components.css';
import config from '../../utils/config';
import profilePhoto from '../../assests/dogPhoto1 copy.jpg';
import video from '../../assests/video-call.svg';
import call from '../../assests/call.svg';
import settings from '../../assests/settings.svg';
import upload from '../../assests/upload.svg';
import camera from '../../assests/camera.svg';
import check from '../../assests/check.svg';
import like from '../../assests/like.svg';
import Post from './Post';

const axios = require('axios').default;
const apiURL = config.baseUrl;
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react'

let addFriends = (f) => {
	if (f.length > 0) {
		return (f.map((username) => <li>{username}</li>))
	} else {
		return <li>You have no Friends :(</li>
	}
}

const Homepage = () => {
	const [posts, setPosts] = useState([])
	const [friends, setFriends] = useState([])
	let history = useHistory();

	useEffect(() => {
		axios.get(`${apiURL}/home/`)
			.then(response => {
				setPosts(response.data.data);
			})
			.catch(error => console.log(error))
	}, [])

	let user_id = window.sessionStorage.getItem("userId");
	useEffect(() => {
		axios.get(`${apiURL}/profile/friends/${user_id}/`)
			.then(response => {
				return response.data.data;
			}).then(response => {
				axios.get(`${apiURL}/profile/`).then(response2 => {
					let friends = response;
					let profiles = response2.data.data;

					let matchingProfile = []
					for (let i = 0; i < friends.length; i++) {
						for (let j = 0; j < profiles.length; j++) {
							if (friends[i].friend == profiles[j].id && !matchingProfile.includes(profiles[j].username)) {
								matchingProfile.push(profiles[j].username)
							}
						}
					}
					setFriends(matchingProfile)
				})
			})
			.catch(error => console.log(error))
	}, [])

	const script = () => {
		window.onload = function () {

			let postButton = document.querySelector("#postButton");

			postButton.addEventListener("click", event => {
				event.preventDefault();
				var text = document.querySelector('#editContent').value;

				const postInfo = {
					author: window.sessionStorage.getItem("userId"),
					post_content: text
				};

				axios.post(`${apiURL}/home/`, postInfo)
					.then(response => {
						setPosts(posts.append(response.data.data))
					})
					.catch(error => console.log(error));
			})

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

	return (
		<div>
			<Helmet>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="" />
				<title>OnlyPets Homepage</title>
				<script dangerouslySetInnerHTML={{ __html: script() }} type="text/javascript" />
				<link href="\client\src\components\bootstrap-5.1.1-dist" rel="stylesheet" crossorigin="anonymous" />
			</Helmet>

			<main class="entireHomepage">
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

				<div class="statusHeaderText-Container">
					<h1 id="statusHeaderText">What's Up On OnlyPets...</h1>
				</div>


				{/* "side nav bar" */}
				<div class="secondNav">
					<div class="sec-nav-container">
						<h3 id="quickNavText">Quick Navigation</h3>
						<div class="btn-group-vertical" id="moreSettingsButtonGroup">
							<Link to="/profile"><button class="button" id="profilePill">Profile</button> </Link>
							<Link to="/settings"><button class="button" id="settingsPill">Settings</button> </Link>
							<Link to="/home"><button class="button" id="pagesPill">Pages</button> </Link>
							<Link to="/profileFriends"><button class="button" id="friendsPill">Friends</button> </Link>
						</div>
					</div>
				</div>



				{/* User's Friends List */}
				<div class="user-contacts-container">
					<h5 id="contactsText">Friends</h5>
					<button class="btn glyphicon glyphicon-option-horizontal" id="moreOptContactsButton"></button>
					<div class="user-friends-list">
						{addFriends(friends)}
					</div>
				</div>

				{/* new post : using car
				ds */}
				<div class="status-container">
					<div class="card w-50 shadow p-3 mb-5 bg-white rounded" id="postCard">

						<div class="card-body">
							<h5 class="card-title" id="cardTitle">{"Hi " + window.sessionStorage.getItem("username") + ","}</h5>

							<div class="col-xs-12" id="post_content">
								<div class="textarea_wrap"> <textarea class="col-xs-11" placeholder="What's on your mind?"
									id="editContent"></textarea> </div>
							</div>

							{/* <a href="#"><span class="glyphicon glyphicon-camera" id="importPhoto"></span></a>
							
							<a href="#"><span class="glyphicon glyphicon-film" id="importVideo"></span></a> */}

							<div class="uploadButton-Container">
								<button class="glyphicon glyphicon-upload" id="uploadButton"></button>
							</div>

							<div class="dropdown">
								<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
									aria-haspopup="true" aria-expanded="false">
									Privacy
								</button>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a class="dropdown-item" href="#">Only Me</a>
									<a class="dropdown-item" href="#">Everyone</a>
									<a class="dropdown-item" href="#">Friends Only</a>
								</div>
							</div>
						</div>
						<button id="postButton" type="submit" class="btn btn-primary" onClick={publishStatus} >Publish</button>
					</div>
				</div>

				<div class="publishedPosts">
					{posts.map(post => <Post key={post.id} post={post} />)}
				</div>

				{/* <div id="chat-bubble">
					<div class="chat-container">
						<div class="chat-header">
							<div class="user-avatar" onClick={open}>
								<div class="img-container">
									<img src="./icons/dogPhoto1 copy.jpg"></img>
								</div>
								<div class="user-status-info">
									<a href="#">Woof Smith</a>
									<p>Active now</p>
								</div>
							</div>
						</div>
					</div>

					<div class="chat-comm">
						<nav>
							<a href="#">
								<img src={video}></img>
							</a>
							<a href="#">
								<img src={call}></img>
							</a>
							<a href="#">
								<img src={settings}></img>
							</a>
							<a href="#">
								<img src={close}></img>
							</a>
						</nav>
					</div> */}




				{/* <div class="sender-me">
            <div class="my-message">
              Hello
            </div>
            <div class="seen-at">
              <img class="check" src={check}> Seen 8:00 AM</img>
            </div>
          </div> */}

				{/* 
        <div class="chat-footer">
          <input type="textarea" placeholder="Type a message..."></input>
          <div class="chat-media">
            <nav>
              <a href="#">
                <img class="upload" src={upload} alt=""></img>
              </a>
              <a href="#">
                <img class="camera" src={camera} alt=""></img>
              </a>
            </nav>
            <a href="#">
              <img class="like" src={like}></img>
            </a>
          </div>
		  </div> */}

				{/* <div class="chat-popup" id="myForm">
  <form action="/action_page.php" class="form-container">
    <h1>Chat</h1>

    <label for="msg"><b>Message</b></label>
    <textarea placeholder="Type message.." name="msg" required></textarea>

    <button type="submit" class="btn">Send</button>
    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
  </form>
</div> */}


			</main>
		</div >
	)
}

// function openChatBubble() {
// 	// doesnt give alert
// 	alert("open");
// 	var element = document.getElementById("chat-bubble");
// 	element.classList.toggle("open")
// }

function toggle_light_mode() {
	var app = document.getElementsByTagName("MAIN")[0];
	if (localStorage.lightMode === "dark") {
		localStorage.lightMode = "light";
		app.setAttribute("light-mode", "light");
	} else {
		localStorage.lightMode = "dark";
		app.setAttribute("light-mode", "dark");
	}
}

function publishStatus() {
	alert("Your Status was posted");

	var privacyButton = document.getElementsByTagName("dropdownMenuButton");
	var publishButton = document.getElementsByTagName("postButton");
	// var cameraIcon = document.getElementsByTagName("importPhoto");
	// var videoIcon = document.getElementsByTagName("importVideo");
	var likeIcon = document.getElementsByTagName("likeButton");
	var commentIcon = document.getElementsByTagName("commentButton");

	// cameraIcon.style.display = "none";
	// videoIcon.style.display = "none";

}

// function openForm() {
// 	document.getElementById("myForm").style.display = "block";
//   }

//   function closeForm() {
// 	document.getElementById("myForm").style.display = "none";
//   }




export default Homepage;