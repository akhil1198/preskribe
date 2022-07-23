import React, { useEffect } from "react";
import { useState } from "react";
import { io } from 'socket.io-client'
import './roomsStyles.css'
import { makeStyles } from "@mui/styles";
import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";
import AlertComponent from "../../globalcomponents/Alerts";
import Loader from "../../globalcomponents/Loader";
import { selectLoading, toggleLoading } from "../../redux/loadingSlice";
import { connect, useSelector, useDispatch } from "react-redux";
import { Autocomplete, Button } from "@mui/material";
import { TextField } from "@mui/material";
import { nanoid } from "nanoid";
import { getVet } from "../../redux/vetSlice";
import DmRooms from "./DmRoom";


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

function VetChat(props) {
	const classes = useStyles();
	const [vets, setVets] = useState([])
	const [socketConnected, setSocketConnected] = useState(false)
	// const [selectedChat, setSelectedChat] = useState(initialState)
	const user = JSON.parse(localStorage.getItem('user'));
	// const [roomName, setRoomName] = useState('')
	// console.log(user)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// mode: onchange(),
		defaultValues: {
			vetName: "",
		},
	});
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);


	useEffect(() => {
		let socket = io('http://localhost:8000/dm');

		socket.on('connect', () => console.log('connected to server!'))
		dispatch(toggleLoading())

		props
			.getVet()
			.unwrap()
			.then(data => {
				console.log(data)
				if (data.status === 200) {
					dispatch(toggleLoading())
					setVets(data.data)
				}
			})
			.catch((err) => {
				console.log(err)
			})

		socket.emit('setup', user)
		socket.on('joinedroom', () => setSocketConnected(true))
	}, [])

	console.log(vets)

	const fetchMessages = async () => {
		// if (!selectedChat) return;
	}

	const selectChat = () => {

	}

	return (
		<div className="container">
			<div className="titlePanel">
				<h1>PreskribeChat | Talk to a vet!</h1>
			</div>
			<div className="controls">
				<div className="userPicHolder"><img src="./img/user.jpg" alt="John Doe" /></div>
				<p className="userName">{user.name}</p>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					type="submit"
					style={{ marginTop: '2%', left: '35%' }}
					onClick={() => window.location.href = "/chat-home"}
				>
					Logout
				</Button>
			</div>

			<div className="controls col">
				<form onSubmit={handleSubmit((data) => console.log(data))}>
					{/* <TextField
						// id="standard-basic"
						label="Room Name"
						variant="standard"
						style={{ width: "63%", marginTop:'5%' }}
						{...register("roomName")}
						// helperText={errors & errors.email?.message}
					/> */}
					{/* <TextField
						id="standard-basic"
						label="Search for a Vet"
						variant="standard"
						style={{ width: "70%", marginTop:'1%', left: '-4%' }}
						{...register("vetName")}
						// helperText={errors & errors.email?.message}
					/> */}
					<Grid container>
						<Grid item xs={6}>
							<Autocomplete
								disablePortal
								id="combo-box-demo"
								options={vets}
								getOptionLabel={(option) => `${option.name} || ${option.designation}`}
								style={{ left: '-4%' }}
								renderInput={(params) => <TextField {...params} id="standard-basic" variant="standard" style={{ marginTop: '1%', left: '24%' }} label="Search for a Vet" />}
							/>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								color="secondary"
								size="small"
								type="submit"
								style={{ marginTop: '4%' }}
								onClick={selectChat()}
							>
								Search
							</Button>
						</Grid>
					</Grid>


				</form>
			</div>
			<Grid container>
				<Grid item xs={4} style={{ borderRight: "1px solid", minHeight: "63vh" }}>
					<div >
						<h3>Vets List</h3>
						<ul className="roomsList" id="roomsListUL">
							{vets.length < 1 ? <h3>No Vets</h3> : vets && vets.map(users => {
								return <li key={users._id} style={{ textAlign: 'left' }}>{users.name}</li>
							})}
						</ul>
					</div>
				</Grid>
				<Grid item xs={8}>
					<DmRooms />
				</Grid>
			</Grid>
		</div>
	);
}


export default connect(null, { getVet })(VetChat)