const Pet = require("../models/PetModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const petControllers = {};
const config = require("config");
petControllers.register = async (req, res, next) => {
	var { name, email, phone, age, password } = req.body;
	console.log(req.body);
	console.log("req: ", req.body);
	try {
		const { email } = req.body;

		const pet = await Pet.findOne({
			email,
		});
		if (pet) {
			return res.status(401).json({
				msg: "Email already registered!",
			});
		} else {
			const salt = await bcryptjs.genSalt(15);
			const hashedpassword = await bcryptjs.hash(password, salt);
			password = hashedpassword;

			let createPet = await new Pet({
				name,
				phone,
				email,
				age,
				password,
			});
			let savePet = await createPet
				.save()
				.then((response) => {
					console.log("Pet Registered!");
					console.log(response);
					const payload = {
						pet: {
							id: createPet.id,
						},
					};
					console.log(payload);
					jwt.sign(payload, process.env.jwtSecret, (err, token) => {
						res.json({
							success: true,
							message: "Registered Successfully.",
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
		return res.status(500).json({ msg: "Server error!" });
	}
};

petControllers.loginPet = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const respon = await Pet.findOne({ email });
		// console.log(respon);
		// console.log(respon);
		if (respon) {
			console.log("response => ", respon);

			const found = await bcryptjs.compare(password, respon.password);

			if (found) {
				console.log(found);
				const payload = {
					user: {
						id: res._id,
					},
				};
				console.log(payload);
				console.log(process.env.jwtSecret);

				jwt.sign(payload, process.env.jwtSecret, (err, token) => {
					res.send({
						success: true,
						message: "Successfully logged in.",
						token: token,
					});
				});
			} else {
				res.send({
					success: false,
					message: "Please check the password.",
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error });
	}
};
module.exports = petControllers;
