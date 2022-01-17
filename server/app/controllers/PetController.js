const Pet = require("../models/PetModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const petControllers = {};

petControllers.register = async (req, res, next) => {
	const { name, email, phone, age, password } = req.body;
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

			let createPet = await new Pet({
				name,
				phone,
				email,
				age,
				hashedpassword,
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

module.exports = petControllers;
