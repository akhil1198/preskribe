import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import background from "../assets/newbg.png";
import { Stack, Button, Divider } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	back: {
		backgroundImage: `url(${background})`,
		backgroundRepeat: "no-repeat",
		height: "100vh",
		width: "100vw",
		// overflow: "hidden",
	},
	paper: {
		color: theme.palette.primary.main,
		height: "100%",
		width: "100%",
		marginTop: "20vh",
		padding: "5%",
		// ["@media (max-width:560px)"]: {
		// 	width: ["2.3rem", "!important"],
		// },
	},
	text: {
		// fontSize: ["4rem", "!important"],
		// fontFamily: "Roboto",
		padding: "0 0 0 0",
		fontSize: ["3.3rem", "!important"],
		// ["@media (max-width:560px)"]: {
		// 	fontSize: ["3.3rem", "!important"],
		// },
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
}));

export default function Home() {
	const classes = useStyles();
	return (
		<div className={classes.back}>
			<Grid container>
				<Grid item xs={1} sm={2}></Grid>
				<Grid item xs={10} sm={8}>
					<Box className="w3-animate-bottom">
						<Paper elevation={12} className={classes.paper}>
							<Typography variant="h2" className={classes.text}>
								Preskribe
							</Typography>
							<Typography variant="h2" className={classes.body}>
								Storing, accessing and managing all your pet's prescription,
								vaccination records and everything related to your furry friend
								made super easy!
							</Typography>
							<Typography variant="h2" className={classes.buttonGrid}>
								Register/Sign In today <br />
								as a
							</Typography>
							<Stack
								direction="row"
								spacing={2}
								divider={<Divider orientation="vertical" flexItem />}
								justifyContent="center"
								mb={3}
							>
								<Button
									variant="contained"
									color="secondary"
									onClick={() => (window.location.href = "/parent")}
								>
									Pet Parent
								</Button>
								<Button
									variant="contained"
									color="secondary"
									onClick={() => (window.location.href = "/vet")}
								>
									Vet
								</Button>
							</Stack>
						</Paper>
					</Box>
				</Grid>
				<Grid item xs={1} sm={2}></Grid>
			</Grid>
		</div>
	);
}
