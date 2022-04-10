const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const VetSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	phone: {
		type: Number,
	},
	designation: {
		type: String,
	},
	hospital: {
		type: String,
	},
	password: {
		type: String,
	},
});

const Vet = mongoose.model("Vet", VetSchema);
module.exports = Vet;
