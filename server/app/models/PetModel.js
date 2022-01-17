const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const petSchema = new Schema({
	name: {
		type: String,
	},
	phone: {
		type: Number,
	},
	email: {
		type: String,
	},
	age: {
		type: Number,
	},
	password: {
		type: String,
	},
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
