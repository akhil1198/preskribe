const Vet = require("../models/VetModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const vetControllers = {};

vetControllers.register = async (req, res, next) => {
	const { name, email, phone, HospitalName, password } = req.body;
	console.log("req: ", req.body);
	try {
		const vet = await Vet.findOne({
			email,
		});
		if (vet) {
			return res.status(401).json({
				msg: "Email already registered!",
			});
		} else {
			const salt = await bcryptjs.genSalt(15);
			const hashedpassword = await bcryptjs.hash(password, salt);

			let createVet = await new Vet({
				name,
				phone,
				email,
				HospitalName,
				hashedpassword,
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
					jwt.sign(payload, "jwtSecret", (err, token) => {
						res.json({ token: token });
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

module.exports = vetControllers;
