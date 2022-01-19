const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.send({
			message: "No token found.",
		});
	}
	//verifying token here
	try {
		const verifiedUser = jwt.verify(token, process.env.jwtSecret);
		req.user = verifiedUser.user;
		next(); //pushing to next process after verifying the token.
	} catch (error) {
		console.log(error);
		return res.send({
			message: "Authentication failed,",
			error: error,
		});
	}
};
