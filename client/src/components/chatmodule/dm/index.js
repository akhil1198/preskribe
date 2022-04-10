import React, { useEffect } from "react";
import { useState } from "react";
import {io} from 'socket.io-client'
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
        let socket = io('http://localhost:8000/roomslist');
		socket.on('connect', () => console.log('connected to server!'))
        dispatch(toggleLoading())

        props
            .getVet()
            .unwrap()
            .then(data => {
                console.log(data)
                if(data.status === 200){
                    dispatch(toggleLoading())
                    setVets(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
	}, [])

    console.log(vets)



	return (
		<div className="container">
			<div className="titlePanel">
				<h1>PreskribeChat | Talk to a vet!</h1>
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
                                renderInput={(params) => <TextField {...params} id="standard-basic" variant="standard" style={{ marginTop:'1%', left: '24%' }} label="Search for a Vet" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                type="submit"
                                style={{ marginTop:'4%' }}
                            >
                                    Chat
                            </Button>
                        </Grid>
                    </Grid>
                    
					
				</form>
				{/* <input type="text" name="roomName" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Create a new Chatroom"/> */}
				{/* <button onClick={createRoom} id="createBtn">Create</button> */}
			</div>
			<div className="roomsListDiv">
				<ul className="roomsList" id="roomsListUL" key={nanoid(4)}>
                    <h3>No new chats</h3>
					{/* {rooms.length < 1 ? <h3>No new chats</h3> : rooms && rooms.map(roo => {
						return <a onClick={(e) => window.location.href = "/chat-room/" + roo.roomID} key={roo.roomID}><li key={roo.roomID}>{roo.room}</li></a>
					})} */}
				</ul>
			</div>
		</div>
	);
}


export default connect(null, { getVet })(VetChat)