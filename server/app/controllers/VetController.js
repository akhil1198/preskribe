const Vet = require("../models/VetModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const vetControllers = {};

vetControllers.register = async (req, res, next) => {
	var { name, email, phone, designation, hospital, password } = req.body;
	console.log("req: ", req.body);
	try {
		const vet = await Vet.findOne({
			email,
		});
		if (vet) {
			return res.send({
				//409 is the status code for conflict
				status: 409,
				message: "Vet email already registered!",
			});
		} else {
			const salt = await bcryptjs.genSalt(15);
			const hashedpassword = await bcryptjs.hash(password, salt);
			password = hashedpassword;

			let createVet = await new Vet({
				name,
				phone,
				email,
				designation,
				hospital,
				password,
			});
			let saveVet = await createVet
				.save()
				.then((response) => {
					console.log("Vet Registered!");
					console.log(response);
					const payload = {
						vet: {
							id: createVet.id,
						},
					};
					console.log(payload);
					jwt.sign(payload, process.env.jwtSecret, (err, token) => {
						res.json({
							success: true,
							status: 200,
							message: "Vet registered successfully.",
							token: token,
						});
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}

		// const error = validationResult(req);
		// if (!error.isEmpty()) {
		// 	//checks if any error in the validation process for the data recieved in the request
		// 	return res.status(401).json({ errors: error.array() });
		// }
	} catch (error) {
		console.log(error);
		return res.send({ status: 500, msg: "Server error!" });
	}
};

vetControllers.loginVet = async (req, res) => {
	const { email, password } = req.body;

	try {
		const checkMail = await Vet.findOne({ email });
		console.log(checkMail);
		if (checkMail) {
			console.log("response => ", checkMail);
			const found = await bcryptjs.compare(password, checkMail.password);

			if (found) {
				const payload = {
					user: checkMail._id,
				};

				jwt.sign(payload, process.env.jwtSecret, (err, token) => {
					res.send({
						success: true,
						status: 200,
						message: "Successfully logged in.",
						token: token,
					});
				});
			} else {
				res.send({
					success: false,
					status: 409,
					message: "Please check the password.",
				});
			}
		} else {
			res.send({
				success: false,
				status: 409,
				message: "Email not registered.",
			});
		}
	} catch (error) {
		console.log(error);
		res.send({
			status: 500,
			success: false,
			message: error,
		});
	}
};

vetControllers.getAll = async (req, res) => {
	console.log('uyo')
	try {
		const getVets = await Vet.find().select("-password");
		console.log(getVets);
		res.send({
			success: true,
			status: 200,
			data: getVets,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 500,
			success: false,
			message: error,
		});
	}
};

module.exports = vetControllers;
