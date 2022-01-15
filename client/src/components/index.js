import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		color: theme.palette.primary.main,
		height: "80vh",
		width: "100%",
		marginTop: "10vh",
		// ["@media (max-width:560px)"]: {
		// 	width: ["2.3rem", "!important"],
		// },
	},
	text: {
		fontSize: ["4rem", "!important"],
		fontFamily: "Roboto",
		["@media (max-width:560px)"]: {
			fontSize: ["2.3rem", "!important"],
		},
	},
}));

export default function Home() {
	const classes = useStyles();
	return (
		<div>
			<Grid container>
				<Grid item xs={1} sm={2}></Grid>
				<Grid item xs={10} sm={8}>
					<Box>
						<Paper elevation={12} className={classes.paper}>
							<Typography className={classes.text}>Preskribe</Typography>
						</Paper>
					</Box>
				</Grid>
				<Grid item xs={1} sm={2}></Grid>
			</Grid>
		</div>
	);
}
