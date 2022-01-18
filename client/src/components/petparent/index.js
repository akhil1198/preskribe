import { TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Wave from "../../assets/Wave.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Stack, Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { connect } from "react-redux";
import { createPet } from "../redux/petSlice";

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
}));

function Petparent(props) {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();
	const [age, setAge] = useState();
	const [password, setPassword] = useState();

	const handleSwitch = (event, newvalue) => {
		// newvalue === 0 ? scrollView("signupform") : null;
		// if (newvalue === 0) {
		// 	scrollView("signupform");
		// }
		// scrollView("name");
		setValue(newvalue);
	};

	const formSubmit = (event, values) => {
		event.preventDefault();
		console.log({ name, phone, email, age, password });

		props
			.createPet({ name, phone, email, age, password })
			.unwrap()
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className={classes.back}>
			<Grid container>
				<Grid item xs={1} sm={2}></Grid>
				<Grid item xs={10} sm={8}>
					<Box className="w3-animate-bottom">
						<Paper elevation={12} className={classes.paper}>
							<Typography variant="h2" className={classes.text}>
								Sign your Pet up and manage prescriptions, records without a
								hassle!
							</Typography>
							<Tabs
								value={value}
								onChange={handleSwitch}
								centered
								textColor="secondary"
								indicatorColor="secondary"
							>
								<Tab label="Log In" />
								<Tab label="Sign Up" />
							</Tabs>
							{value === 1 ? (
								<div className={classes.signup} id="name">
									<form onSubmit={formSubmit}>
										<TextField
											id="name"
											label="Name"
											variant="standard"
											style={{ width: "80%" }}
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
										<TextField
											id="standard-basic"
											label="Email"
											variant="standard"
											style={{ marginTop: "5%", width: "80%" }}
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										<TextField
											id="standard-basic"
											label="Phone"
											variant="standard"
											style={{ marginTop: "5%", width: "80%" }}
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
										/>
										<TextField
											id="standard-basic"
											label="Age"
											type="number"
											variant="standard"
											style={{
												marginTop: "5%",
												width: "80%",
											}}
											value={age}
											onChange={(e) => setAge(e.target.value)}
										/>
										<TextField
											id="standard-basic"
											label="Password"
											variant="standard"
											style={{
												marginTop: "5%",
												width: "80%",
												marginBottom: "10%",
											}}
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
										<Stack
											direction="row"
											spacing={2}
											justifyContent="center"
											mb={2}
										>
											<Button
												variant="contained"
												color="secondary"
												size="small"
												type="submit"
											>
												Submit
											</Button>
											<Button
												variant="contained"
												color="secondary"
												size="small"
												onClick={() => (window.location.href = "/")}
											>
												Cancel
											</Button>
										</Stack>
									</form>
								</div>
							) : (
								<div>
									<form>
										<TextField
											id="email"
											label="Email"
											variant="standard"
											style={{ marginTop: "5%", width: "80%" }}
										/>
										<TextField
											id="password"
											label="Password"
											variant="standard"
											style={{
												marginTop: "5%",
												width: "80%",
												marginBottom: "10%",
											}}
										/>
										<Stack
											direction="row"
											spacing={2}
											justifyContent="center"
											mb={2}
										>
											<Button
												variant="contained"
												color="secondary"
												size="small"
												type="submit"
											>
												Submit
											</Button>
											<Button
												variant="contained"
												color="secondary"
												size="small"
												onClick={() => (window.location.href = "/")}
											>
												Cancel
											</Button>
										</Stack>
									</form>
								</div>
							)}
						</Paper>
					</Box>
				</Grid>
				<Grid item xs={1} sm={2}></Grid>
			</Grid>
		</div>
	);
}

export default connect(null, { createPet })(Petparent);
