import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Wave from "../../assets/Wave.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ChatLogin from "./auth/ChatLogin";

const useStyles = makeStyles((theme) => ({
	back: {
		backgroundImage: `url(${Wave})`,
		width: "100vw",
		height: "100vh",
	},
	paper: {
		color: theme.palette.primary.main,
		maxHeight: "100vh",
		width: "100%",
		// marginTop: "5vh",
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

function Chat(props) {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleSwitch = (event, newvalue) => {
		setValue(newvalue);
	};

	return (
		<Grid
			container
			justify="center"
			alignItems="center"
			className={classes.back}
			direction="row"
			style={{ minHeight: "100vh" }}
		>
			<Grid item xs={1}></Grid>
			<Grid item xs={10}>
				<Box className="w3-animate-bottom">
					<Paper elevation={12} className={classes.paper}>
						<Typography variant="h2" className={classes.text}>
							Welcome to Preskribe Chat!
						</Typography>
						<ChatLogin />
					</Paper>
				</Box>
			</Grid>
			<Grid item xs={1}></Grid>
		</Grid>
	);
}

export default Chat;
