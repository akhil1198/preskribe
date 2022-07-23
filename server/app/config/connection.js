const mongoose = require("mongoose");
const config = require("config");

const connection = async () => {
	try {
		await mongoose.connect(process.env.mongoURI, {
			useUnifiedTopology: true,   // the MongoDB driver will try to find a server to send any given operation to, and keep retrying for serverSelectionTimeoutMS milliseconds
			useNewUrlParser: true,   //allow users to fall back to the old parser if they find a bug in the new parser
		});
		console.log("MongoDB Connected!");
	} catch (error) {
		console.log(error);
		console.log("MongoDB connection failed!");
		process.exit(1);
	}
};

module.exports = connection;
