import React, { useEffect } from "react";
import { useState } from "react";
import {io} from 'socket.io-client'
import './roomsStyles.css'
import { makeStyles } from "@mui/styles";

import { useForm } from "react-hook-form";
import AlertComponent from "../../globalcomponents/Alerts";
import Loader from "../../globalcomponents/Loader";
import { selectLoading, toggleLoading } from "../../redux/loadingSlice";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { nanoid } from "nanoid";


const useStyles = makeStyles((theme) => ({
	
	paper: {
		color: theme.palette.primary.main,
		maxHeight: "100vh",
		width: "100%",
		marginTop: "5vh",
		padding: "5%",
		// overflow: "scroll",
		// ["@media (max-width:560px)"]: {
		// 	width: ["2.3rem", "!important"],
		// },
	},
	text: {
		// fontSize: ["4rem", "!important"],
		// fontFamily: "Roboto",
		padding: "0 0 0 0",
		fontSize: ["3.3rem", "!important"],
		["@media (max-width:560px)"]: {
			fontSize: ["1.5rem", "!important"],
		},
	},
	body: {
		padding: "3% 10% 5% 10% ",
		fontSize: ["2rem", "!important"],
		["@media (max-width:560px)"]: {
			fontSize: ["1.3rem", "!important"],
		},
	},
	buttonGrid: {
		padding: "0 10% 6% 10% ",
		fontSize: ["2rem", "!important"],
		["@media (max-width:560px)"]: {
			fontSize: ["1.3rem", "!important"],
		},
	},
	signup: {
		padding: "5% 0 0 0",
	},
	errorMessage: {
		fontSize: "10px",
		color: "red",
	},
}));

export default function ChatRoom() {
	let socket = io('http://localhost:8000/roomslist');
	socket.on('connect', () => console.log('connected to server!'))
	let chatRooms = null
	socket.emit('getChatrooms')
	const classes = useStyles();
	const [rooms, setrooms] = useState([])
	const user = JSON.parse(localStorage.getItem('user'));
	// const [roomName, setRoomName] = useState('')
	console.log(user)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// mode: onchange(),
		defaultValues: {
			roomname: "",
		},
	});
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	// const renderChat = chats => {
	// 	let listStr = '';
	// 	for (let cat of chats){
	// 		listStr += 
	// 	}
	// }


	
	useEffect(() => {
		const chatrooms = (room) => {
			console.log(room)
			setrooms(room)
		}
		socket.on('chatRoomsList', chatrooms)
	}, [])
	console.log(rooms)

	const createRoom = (values) => {
		// event.preventDefault()
		let { roomname } = values
		if(roomname != ''){
			console.log(roomname)
			socket.emit('createNewRoom', roomname)
			roomname = ''
		} else {
			console.log("room name is empty", roomname)
		}
		return false;
	}


	return (
		<div className="container">
			<div className="titlePanel">
				<h1>ChatCAT | Select or Create a Chatroom</h1>
			</div>
			<div className="controls">
				<div className="userPicHolder"><img src="./img/user.jpg" alt="John Doe"/></div>
				<p className="userName">{user.name}</p>
				<Button
						variant="contained"
						color="secondary"
						size="small"
						type="submit"
						style={{ marginTop:'2%', left: '35%' }}
					>
							Logout
					</Button>
			</div>
			<div className="controls">
				<form onSubmit={handleSubmit((data) => createRoom(data))}>
					{/* <TextField
						// id="standard-basic"
						label="Room Name"
						variant="standard"
						style={{ width: "63%", marginTop:'5%' }}
						{...register("roomName")}
						// helperText={errors & errors.email?.message}
					/> */}
					<TextField
					id="standard-basic"
					label="Room Name"
					variant="standard"
					style={{ width: "70%", marginTop:'1%', left: '-4%' }}
					{...register("roomname")}
					// helperText={errors & errors.email?.message}
				/>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						type="submit"
						style={{ marginTop:'2%' }}
					>
							Create
					</Button>
				</form>
				{/* <input type="text" name="roomName" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Create a new Chatroom"/> */}
				{/* <button onClick={createRoom} id="createBtn">Create</button> */}
			</div>
			<div className="roomsListDiv">
				<ul className="roomsList" id="roomsListUL" key={nanoid(4)}>
					{rooms.length < 1 ? <h3>No Rooms</h3> : rooms && rooms.map(roo => {
						return <a onClick={(e) => window.location.href = "/chat-room/" + roo.roomID} key={roo.roomID}><li key={roo.roomID}>{roo.room}</li></a>
					})}
				</ul>
			</div>
		</div>
	);
}
