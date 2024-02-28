const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		isTeam: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
		},
		name1: {
			type: String,
		},
		name2: {
			type: String,
		},
		phone: {
			type: String,
		},
		regno: {
			type: String,
		},
		regno1: {
			type: String,
		},
		regno2: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
