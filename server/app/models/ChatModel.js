const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const chatSchema = new Schema({
	// name: {
	// 	type: String,
	// },
	// phone: {
	// 	type: Number,
	// },
	// email: {
	// 	type: String,
	// },
	// age: {
	// 	type: Number,
	// },
	// password: {
	// 	type: String,
	// },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
