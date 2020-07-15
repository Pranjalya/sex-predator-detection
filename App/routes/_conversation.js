const express = require('express')
const router = express.Router()

const Conversation = require('../models/conversation')

const auth = require('../util/auth')

router.get('/:id', auth, (req, res) => {
	Conversation.findOne({ _id: req.params.id }, (err, data) => {
		if (err) {
			return res.status(404).json({ message: 'Conversation not found' })
		}

		return res.status(200).send(data)
	})
})

router.get('/conv/:id', auth, (req, res) => {
	let r_id = req.params.id

	Conversation.findOne(
		{
			$or: [
				{ madeBy: req.user.id, madeWith: r_id },
				{ madeBy: r_id, madeWith: req.user.id },
			],
		},
		(err, data) => {
			if (data) {
				console.log('got the conv')
				return res.status(200).send(data)
			} else {
				const newConversation = new Conversation({
					madeBy: req.user.id,
					madeWith: r_id,
				})

				newConversation
					.save()
					.then(result => {
						return res.status(200).json(result)
					})
					.catch(err => {
						return res.sendStatus(500).json({ error: err })
					})
			}
		}
	)
})

router.post('/message', auth, (req, res) => {
	const newMessage = {
		author: req.user.id,
		text: req.body.text,
	}

	let convId = req.body.conversationId

	Conversation.findOneAndUpdate(
		{ _id: convId },
		{ $push: { messages: newMessage } },
		(err, data) => {
			if (err) {
				return res.send({
					error: 'Something bad happend. Please try again later',
				})
			}

			req.io.sockets.emit(`Message`, {
				...req.body,
				author: req.user.id,
				_id: `${req.user.id}-${Date.now()}`,
			})

			return res.status(200).json(data)
		}
	)
})

module.exports = router
