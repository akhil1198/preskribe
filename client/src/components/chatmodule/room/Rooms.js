import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {io} from 'socket.io-client'

export default function Rooms(props) {
	const { id } = useParams()
	console.log(id)
	let socket = io('http://localhost:8000/roomslist');
	socket.on('connect', () => console.log('connected to server!'))
	socket.emit('checkIfRoomExists', id)

	useEffect(() => {
		const chatrooms = (data) => {
			console.log(data)
		}
		socket.on('checkID', chatrooms)
	}, [])

	// useEffect(() => {
	// 	console.log("yo", props)
	// }, [props])
    // console.log(props)

	


	return (
		<div>
			
		</div>
	);
}
