const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const messageSchema = new Schema({
	roomName: {
		type: String
	},
	roomID: {
		type: String
	},
	messages: {
		type: Array,
		"default": []
	}
});

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;
