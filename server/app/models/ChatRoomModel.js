const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const chatRoomSchema = new Schema({
	room: {
		type: String,
	},
	roomID: {
		type: String,
	},
	users: {
		type: Array,
		"default": []
	},
});

const Chatroom = mongoose.model("Chatroom", chatRoomSchema);
module.exports = Chatroom;
