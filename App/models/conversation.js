const { Schema, model } = require('mongoose')

const conversationSchema = Schema({
	date: {
		type: String,
		default: Date.now,
	},
	madeBy: {
		type: String,
		required: true,
	},
	madeWith: {
		type: String,
		required: true,
	},
	messages: [
		{
			text: String,
			author: String,
			time: {
				type: String,
				default: `${new Date().getHours()}:${new Date().getMinutes()}`,
			},
		},
	],
})

module.exports = model('Conversation', conversationSchema)
