import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {io} from 'socket.io-client'
import './chatroomStyles.css'
export default function Rooms(props) {
	const { id } = useParams()
	let socket = io('http://localhost:8000/roomslist');
	socket.on('connect', () => console.log('connected to server!'))
	socket.emit('checkIfRoomExists', id)
	const [roomName, setRoomName] = useState()
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		const chatrooms = (data, roomData) => {
			console.log(roomData)
			if(roomData == undefined){
				window.open("/chat-room", "_self");
			}
			setRoomName(roomData && roomData.room)
		}
		socket.on('checkID', chatrooms)
	}, [])

	// useEffect(() => {
	// 	console.log("yo", props)
	// }, [props])
    // console.log(props)

	


	return (
		<div className="container">
			<div className="titlePanel">
				<h1>{roomName}</h1>
			</div>
			<div className="controls">
				<div className="userPicHolder"><img src="./img/user.jpg" alt="John Doe" /></div>
				<p className="userName">{user.name}</p>
				<a href="/chat-room" id="roomsBtn">Rooms</a>
				<a href="/chat-room" id="logOutBtn">Logout</a>
			</div>
			<div className="chatListDiv">
				<div className="chatMessagesPanel">
					<div className="chatMessages">
					<div className="chatBlock">
						<div className="userPic"><img src="./img/user.jpg" /></div>
						<div className="chatMsg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti perferendis eius aut nesciunt necessitatibus ad nulla, qui sequi, id nam. Possimus odit aut nisi veritatis amet distinctio id officiis ipsam!</div>
					</div>					
					</div>
					<div className="typePanel">
						<input type="text" name="userInput" placeholder="Type here and press enter" />
						<a href="#" id="uploadFile" className="fileUploadBtn">Photo</a>
					</div>
				</div>
				<div className="chatUsers">
					<div className="userBlock">
						<div className="userPic"><img src="./img/user.jpg" alt="John Doe" /></div>
						<div className="cuserName">John Doe</div>
					</div>
				</div>
			</div>
		</div>
	);
}
