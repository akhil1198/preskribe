import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {io} from 'socket.io-client'
import './chatroomStyles.css'
import { useForm } from "react-hook-form";
import AlertComponent from "../../globalcomponents/Alerts";
import Loader from "../../globalcomponents/Loader";
import { selectLoading, toggleLoading } from "../../redux/loadingSlice";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { nanoid } from "nanoid";

export default function Rooms(props) {
	const [roomName, setRoomName] = useState()
	const [roomData, setRoomData] = useState()
	const [roomUsers, setRoomUser] = useState([])
	const [messages, setMessages] = useState([])
	const [key, setKey] = useState(true)
	const user = JSON.parse(localStorage.getItem('user'));
	const componentMounted = useRef(true); // (3) component is mounted

	const { id } = useParams()
	let socket = io('http://localhost:8000/roomslist');
	let chatter = io('http://localhost:8000/chatter');

	socket.on('connect', () => console.log('connected to server!'))
	socket.emit('checkIfRoomExists', id)

	let roomID = roomData && roomData.roomID

	chatter.on('connect', () => console.log('connected to chatter!'))

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		// mode: onchange(),
		defaultValues: {
			message: "",
		},
	});

	chatter.emit('getNewMessages')

	useEffect(() => {
		const chatrooms = (data, roomData) => {
			if (componentMounted.current){ // (5) is component still mounted?
					// //console.log("chatrooms => ", roomData, data)
				if(roomData == undefined){
					window.open("/chat-room", "_self");
				}
				setRoomName(roomData && roomData.room)
				setRoomData(roomData && roomData)
			}
			
		}
		socket.on('checkID', chatrooms)
		return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }
	}, [])
	console.log(chatter.roo)



	useEffect(() => {
		chatter.emit('join', {
			roomID: roomData && roomData.roomID,
			user,
		})

	}, [roomData])


	useEffect(() => {
		const updateUsers = (data) => {
			// //console.log("updatedUsers => ", data)
			if (componentMounted.current){ // (5) is component still mounted?
				if(id == data.roomID) {
					setRoomUser(data.users)
				} else {

				}
			}
			//checking the room id in the updated users data to only updated the users of the particular room
			
		}
		
		chatter.on('roomJoined', updateUsers) 

		 return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }
	}, [])

	
	useEffect(() => {
		socket.on('disconnect', () => {
            //console.log('Disconnected');
        });
	})

	//sending messages
	const sendMessage = (values) => {
		
		if(values.message.length > 0) {
			chatter.emit('newMessage', {
				roomID,
				user,
				message: values.message
			})
			reset()
		} else {
			
			alert("type a msg")

		}

		getNewMessages()
		return false;
	}

	const getNewMessages = () => {
		chatter.emit('getNewMessages')
		chatter.on('allNewMessages', (data) => {
			console.log("all messages => ", data)
			if (componentMounted.current){ // (5) is component still mounted?
				if(data.roomID == id){
					setMessages(data.messages)
				}
			}
			// //console.log("message state => ", messages)
		})
	}

	//loading all messages
	useEffect( async () => {
        const updateMessages = (data) => {
			console.log("all messages => ", data)

			function isRoom(rooms) {
				return rooms.roomID === id;
			}
			const foundRoom = data.find(isRoom)

			if(foundRoom){
				setMessages(foundRoom.messages)
			}
		}

		chatter.on('allNewMessages', updateMessages)
        // When request is finished:
       
        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }
    }, []);

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
							{
								messages && messages.length < 1 ? <h3>No Messages</h3> : messages && messages.map(msg => {
									return user._id == msg.user._id ? <div className="chatBlock" key={nanoid(4)}><div className="chatMsg" key={nanoid(4)} style={{ textAlign: 'right'}}>{msg.message}</div></div> : <div className="chatBlock" key={nanoid(4)}><div className="chatMsg" key={nanoid(4)} style={{ textAlign: 'left' }}>{msg.message}</div></div>
								})
							}
					</div>
					<div className="typePanel">
						<form onSubmit={handleSubmit((data) => sendMessage(data))}>
							<TextField
								id="standard-basic"
								variant="standard"
								placeholder="Type your message"
								style={{ width: "70%", marginTop: "3%", right: '5%' }}
								// , marginTop:'1%', left: '-4%'
								{...register("message")}
								onKeyUp={(event) => {
									if (event.key== 'Enter'){
										sendMessage(event.target.value)
									}
								}}
								// helperText={errors & errors.email?.message}
							/>
							<Button
								variant="contained"
								color="secondary"
								size="small"
								type="submit"
								style={{ marginTop:'3%' }}
							>
								Send
							</Button>
						</form>
						{/* <a href="#" id="uploadFile" className="fileUploadBtn">Photo</a> */}
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
