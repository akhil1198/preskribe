import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {io} from 'socket.io-client'
import './chatroomStyles.css'
export default function Rooms(props) {
	const [roomName, setRoomName] = useState()
	const [roomData, setRoomData] = useState()
	const [roomUsers, setRoomUser] = useState([])
	const user = JSON.parse(localStorage.getItem('user'));

	const { id } = useParams()
	let socket = io('http://localhost:8000/roomslist');
	let chatter = io('http://localhost:8000/chatter');

	socket.on('connect', () => console.log('connected to server!'))
	socket.emit('checkIfRoomExists', id)

	let roomID = roomData && roomData.roomID

	chatter.on('connect', () => console.log('connected to chatter!'))


	useEffect(() => {
		const chatrooms = (data, roomData) => {
			console.log(roomData)
			if(roomData == undefined){
				window.open("/chat-room", "_self");
			}
			setRoomName(roomData && roomData.room)
			setRoomData(roomData && roomData)
		}
		socket.on('checkID', chatrooms)
	}, [])

	useEffect(() => {
		console.log("sup", roomData)
		chatter.emit('join', {
			roomID: roomData && roomData.roomID,
			user,
		})

	}, [roomData])

	useEffect(() => {
		const updateUsers = (data) => {
			//checking the room id in the updated users data to only updated the users of the particular room
			if(id == data.roomID) {
				setRoomUser(data.users)
			} else {

			}
		}
		
		chatter.on('roomJoined', updateUsers) 
	}, [])

	useEffect(() => {
		socket.on('disconnect', () => {
            console.log('Disconnected');
        });
	})

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
					<div >
						<h3>People in this chat</h3>
						<ul className="roomsList" id="roomsListUL">
							{roomUsers.length < 1 ? <h3>No Users</h3> : roomUsers && roomUsers.map(user => {
								return <li key={user.userID} style={{ textAlign: 'left' }}>{user.userName}</li>
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
