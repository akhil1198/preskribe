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

	
	let roomID = roomData && roomData.roomID

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

	useEffect(() => {
		socket.on('connect', () => console.log('connected to group-server!'))
		chatter.on('connect', () => console.log('connected to group-chatter!'))
	}, [])
		socket.emit('checkIfRoomExists', id)
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



	useEffect(() => {
		chatter.emit('join', {
			roomID: roomData && roomData.roomID,
			user,
		})

	}, [roomData])

	//problems :
	//client disconnects randomly
	//insufficient resources from sockets after chatting for a while
	

	useEffect(() => {
		//this is buggy.
		const updateUsers = (data) => {
			console.log("updatedUsers => ", data)
			if(data){
				if (componentMounted.current){ // (5) is component still mounted?
					if(id == data.roomID) {
						setRoomUser(data.users)
					}
				}
			}
			
			//checking the room id in the updated users data to only updated the users of the particular room
			
		}
		
		chatter.on('roomJoined', updateUsers) 

		 return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }
	}, [0])


	const AlwaysScrollToBottom = () => {
		const elementRef = useRef();
		useEffect(() => elementRef.current.scrollIntoView());
		return <div ref={elementRef} />;
	};
	
	//sending messages
	const sendMessage = (values) => {
		// console.log(values.message.length)
		if(values.message) {
			chatter.emit('newMessage', {
				roomID,
				user,
				message: values.message
			})
			reset()
		}

		getNewMessages()
		return false;
	}

	const getNewMessages = () => {
		chatter.emit('getNewMessages')
		chatter.on('allNewMessages', (data) => {
			// console.log("all messages => ", data)
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
        const fetchMessages = (data) => {

			// so when trying to update messages first : i need to check if it belongs to that room, second : i need to set it to state. 
			// console.log(data)

			//data here contains the room details with the messages array
			//so i need to first get the room that the user is currently at.
			//and then i need to access the messages array
			//and then i need to set that array to state

			//error here => data.find is not a function. data is an array of objects
			//solution => updating and fetching messages at the same place which is leading to this error. write a new function to update messages cause when there is an update only one object is returned with updated array of messages
			//make this a function to fetch messages and not update.
			const roomMessages = data && data.find(room => {
				// console.log(room)
				return room.roomID == id
			})

			//roomMessages now has the correct room and now we can access the messages array.
			// console.log("===============>", roomMessages)

			if(roomMessages && roomMessages.messages){
				// console.log(roomMessages.messages)
				setMessages(roomMessages.messages)
			}
		}

		chatter.on('allNewMessages', fetchMessages)
        // When request is finished:
       
        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }
    }, []);


	//useEffect to update messages
	useEffect(() => {
		const updateMessages = (data) => {
			//
			// console.log(data)
			if(data && data.messages) {
				setMessages(data.messages)
			}
			
		}
		chatter.on('updateNewMessages', updateMessages)

	}, [])

	return (
		<div className="container">
			<div className="controls">
				<div className="userPicHolder"><img src="./img/user.jpg" alt="John Doe" /></div>
				<p className="userName">{roomName}</p>
				<a href="/chat-room" id="roomsBtn">Rooms</a>
				<a href="/chat-room" id="logOutBtn">Logout</a>
			</div>
			<div className="chatListDiv">
				<div className="chatMessagesPanel">
					<div className="chatMessages" >
							{
								messages && messages.length < 1 ? <h3>No Messages</h3> : messages && messages.map(msg => {
									return user._id == msg.user._id ? <div style={{ textAlign: '-webkit-right' }} key={nanoid(4)}><div className="chatBlock" key={nanoid(4)} ><div className="chatMsg" key={nanoid(4)} style={{ textAlign: 'right' }}>{msg.message}</div></div></div> : <div style={{ textAlign: '-webkit-left' }} key={nanoid(4)}><div className="chatBlock" key={nanoid(4)} ><div className="chatMsg" key={nanoid(4)} style={{ textAlign: 'left' }}>{msg.message}</div></div></div>
								})
							}
							<AlwaysScrollToBottom />
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
							{roomUsers.length < 1 ? <h3>No Users</h3> : roomUsers && roomUsers.map(users => {
								return <li key={users.userID} style={{ textAlign: 'left' }}>{users.userName == user.name ? `${users.userName} (you)` : users.userName}</li>
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
