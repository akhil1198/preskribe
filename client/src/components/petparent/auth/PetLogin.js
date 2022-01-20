import { TextField, Alert, Collapse, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Wave from "../../../assets/Wave.png";
import { Stack, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import { loginPet } from "../../redux/petSlice";
import { useForm } from "react-hook-form";

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
	errorMessage: {
		fontSize: "10px",
		color: "red",
	},
}));

function PetLogin(props) {
	const classes = useStyles();
	const [alertContent, setAlertContent] = useState();
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// mode: onchange(),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	//you can set default values to the form by sending a defaultValues object with the details to be prefilled
	//use watch() api in useForm to get values for each field for example const name = watch('name') and youll get the values in name field

	const loginSubmit = (values) => {
		console.log(values);

		const { email, password } = values;
		props
			.loginPet({ email, password })
			.unwrap()
			.then((data) => {
				console.log(data);
				setAlertContent({ status: data.status, message: data.message });
				setOpen(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			{alertContent ? (
				<Collapse in={open}>
					<Alert
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setOpen(false);
									setAlertContent();
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						severity={alertContent.status === 200 ? "success" : "error"}
						sx={{ mb: 2 }}
					>
						{alertContent.message}
					</Alert>
				</Collapse>
			) : (
				<></>
			)}
			<form onSubmit={handleSubmit((data) => loginSubmit(data))}>
				<TextField
					id="standard-basic"
					label="Email"
					variant="standard"
					style={{ width: "80%" }}
					{...register("email", {
						required: "This is a mandatory field.",
						pattern: {
							value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
							message: "Please enter a valid email.",
						},
					})}
					// helperText={errors & errors.email?.message}
				/>
				<p className={classes.errorMessage}>
					{errors && errors.email?.message}
				</p>
				<TextField
					id="standard-basic"
					label="Password"
					variant="standard"
					style={{
						marginTop: "5%",
						width: "80%",
						marginBottom: "10%",
					}}
					{...register("password")}
				/>
				{/* <p
											className={classes.errorMessage}
											style={{ marginBottom: "10%" }}
										>
											{errors && errors.password?.message}
										</p> */}
				<Stack direction="row" spacing={2} justifyContent="center" mb={2}>
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
	);
}

export default connect(null, { loginPet })(PetLogin);
