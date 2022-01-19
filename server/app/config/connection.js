const mongoose = require("mongoose");
const config = require("config");

const connection = async () => {
	try {
		await mongoose.connect(process.env.mongoURI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log("MongoDB Connected!");
	} catch (error) {
		console.log(error);
		console.log("MongoDB connection failed!");
		process.exit(1);
	}
};

module.exports = connection;
