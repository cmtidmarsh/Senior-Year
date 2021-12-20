import React, { useState, useEffect } from 'react'
const axios = require('axios').default;
import config from '../../utils/config';
const apiURL = config.baseUrl;

const Message = ({ message }) => {
	const [author, setAuthor] = useState({})
	let username = window.sessionStorage.getItem("username");

	useEffect(() => {
		axios.get(`${apiURL}/profile/`)
			.then(response => {
				let profiles = response.data.data;
				for (let i = 0; i < profiles.length; i++) {
					if (profiles[i].id === message.author) {
						setAuthor(profiles[i]);
						break;
					}
				}
			})
			.catch(error => console.log(error))
	}, [])

	const messageStyleTo = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "white",
		marginTop: 8,
		marginBottom: 5,
		width: 300,
		justifyContent: 'center',
		backgroundColor: "#c3c3ca",
		boxShadow: "1px 3px 1px #adadad",
		marginLeft: 10,
		// position: "absolute",
		// left: 500,
		// bottom: 300,
	}

	const messageStyleFrom = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "white",
		marginBottom: 5,
		marginTop: 8,
		width: 300,
		justifyContent: 'center',
		backgroundColor: "#9fe1fd",
		boxShadow: "1px 3px 1px #adadad",
		marginLeft: 390,
		// position: "absolute",
		// left: 500,
		// bottom: 300,
	}

	const [detailsVisible, setDetailsVisible] = useState(false)

	const showDetails = (visible) => {
		if (visible) {
			return (
				<div>
					{"From: " + message.fromProfile} <br />
					{message.message_timestamp.slice(0, 10)} <br />
					{message.status} <br />
				</div>
			)
		} else {
			return (<span></span>)
		}
	}

	return (
		<div className={'message'} style={message.toProfile === username ? messageStyleTo : messageStyleFrom} id="messageedStatus">
			<div>
				<h5 id="postedMessageHeader">{message.message_content}</h5>
				<button id={'detailsButtonMessages'} onClick={() => setDetailsVisible(!detailsVisible)} type='button' class="
glyphicon glyphicon-chevron-down"></button>
			</div>
			{showDetails(detailsVisible)}
		</div>
	)
}

export default Message;