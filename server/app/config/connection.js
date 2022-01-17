const mongoose = require("mongoose");
const config = require("config");

const connection = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://akhil1198:akhil1198@cluster0.mbhkw.mongodb.net/preskribeDB",
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		);
		console.log("MongoDB Connected!");
	} catch (error) {
		console.log(error);
		console.log("MongoDB connection failed!");
		process.exit(1);
	}
};

module.exports = connection;
