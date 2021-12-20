import React from 'react'
import logWithBorder from '../../assests/logoWithBorder.jpg';
import dogPhoto1 from '../../assests/dogPhoto1.jpg';
import dogHeader from '../../assests/dogHeader.jpg';
import { Helmet } from "react-helmet";
import '../components.css';
import config from '../../utils/config';
import textlogo from '../../assests/textLogo.jpg';
const axios = require('axios').default;
const apiURL = config.baseUrl;
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

const Profile = () => {
    const { user } = useParams()
    const [profileData, setProfileData] = useState({})
    let history = useHistory();

    useEffect(() => {
        axios.get(`${apiURL}/profile/id/${user}/`).then(response2 => {
            setProfileData(response2.data.data)
        })
    }, [])

    console.log(profileData)

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

    return (
        <div>
            <Helmet>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="" />
                <title>OnlyPets User Profile</title>
                <script dangerouslySetInnerHTML={{ __html: script() }} type="text/javascript" />
            </Helmet>

            <main class="entire-profilepage">
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

                <div class="everythingButNavBar">


                    {/* Add script for "Edit Cover Photo Button" */}
                    <div class="profile-container">
                        <div class="coverphoto">
                            <img src={dogHeader} class="cover-img" alt="small dog in a field" />
                            <button class="btn btn-primary" id="coverphotobutton" onclick="myFunction">Edit Cover Photo</button>
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
                        <div class="card shadow p-3 mb-5 bg-white rounded" id="bioCard">
                            <div class="profiledetails-left">
                                <div class="profiledetails-row">
                                    <img src={dogPhoto1} class="profile-img" alt="small dog sitting on a floor" />
                                    <div>
                                        <h3 id="friendsname">Woof Smith</h3>
                                        <p id="friendsdetails">2 Friends - 1 mutual</p>
                                    </div>
                                </div>


                            </div>

                            <div class="profiledetails-right">

                                <button type="button" class="glyphicon glyphicon-plus " id="friendButton"> Friend </button>
                                <button type="button" class="glyphicon glyphicon-envelope" id="messageButton"> Message </button>
                                <button type="button" class="glyphicon glyphicon-remove" id="profileBlockButton"> Block</button>
                                {/* <a class="glyphicon glyphicon-option-vertical"></a> */}
                            </div>
                        </div>

                        <div class="profileinfo">
                            <div class="info-col"></div>
                            <div class="post-col">
                                <div class="card w-60 shadow p-3 mb-5 bg-white rounded" id="profilepostCard">
                                    {/*  card's body */}
                                    <div class="-profile-card-body">
                                        <h5 class="card-title" id="cardTitle"></h5>

                                        <div class="col-xs-12" id="post_content">
                                            <div class="textarea_wrap"> <textarea class="col-xs-11"
                                                placeholder="What's on your mind?" id="editContent"></textarea> </div>
                                        </div>
                                        {/* 
                                        <a href="#"><span class="glyphicon glyphicon-camera" id="importPhoto"></span></a>
                                        <a href="#"><span class="glyphicon glyphicon-film" id="importVideo"></span></a> */}
{/* 
                                        <button class="glyphicon glyphicon-heart" id="likeButton"></button>
                                        <div class="commentButton-Container">
                                            <button class="glyphicon glyphicon-pencil" id="commentButton"></button>
                                        </div> */}
                                        <div class="uploadButton-Container">
                                            <button class="glyphicon glyphicon-upload" id="uploadButton"></button>
                                        </div>

                                        <div class="dropdown">
                                            <button class="btn btn-primary dropdown-toggle" type="button"
                                                id="profileStatusDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false"> Privacy </button>

                                            <div class="dropdown-menu" aria-labelledby="profileStatusDropdownMenuButton">
                                                <a class="dropdown-item" href="#">Only Me</a>
                                                <a class="dropdown-item" href="#">Everyone</a>
                                                <a class="dropdown-item" href="#">Friends Only</a>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary" id="postButton" onClick={postStatus}>Publish</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* cover image insert */}
                        {/* <form action="/action_page.php">
                        <label for="img" id="coverimagetext">Cover Image</label> */}
                        {/* <input type="file" id="img" name="img" accept="image/*">
                    </form>  */}
                    </div>
                    {/* new post : using cards */}
                    {/* <div class="card shadow p-3 mb-5 bg-white rounded" id="bioCard"> */}
                </div>
                {/* JS for adding cover photo */}
                {/* JS for publishing status */}
            </main >
        </div >
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


function postStatus() {
    alert("Status published");
}



export default Profile;