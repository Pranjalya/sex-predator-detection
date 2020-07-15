const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()

const { SECRET_KEY } = require('../config')

const { validateSignUpData, validateLoginData } = require('../util/validators')
const auth = require('../util/auth')

const User = require('../models/users')

function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			handle: user.handle,
		},
		SECRET_KEY,
		{
			expiresIn: '1h',
		}
	)
}

router.post('/signup', async (req, res) => {
	const { valid, errors } = validateSignUpData({
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		handle: req.body.handle,
	})

	if (!valid) return res.status(400).json(errors)

	let { handle, email, password } = req.body

	let user = await User.findOne({ email })
	if (user) {
		errors.general = 'Email is already registered'
		return res.status(400).json(errors)
	}

	password = await bcrypt.hash(password, 12)

	const newUser = new User({
		email,
		handle,
		password,
	})

	const result = await newUser.save()

	const token = generateToken(result)

	return res.status(200).json({
		...newUser._doc,
		id: newUser._id,
		token,
	})
})

router.post('/login', async (req, res) => {
	const { valid, errors } = validateLoginData({
		email: req.body.email,
		password: req.body.password,
	})

	if (!valid) return res.status(400).json(errors)

	let { email, password } = req.body

	const user = await User.findOne({ email })
	if (!user) {
		errors.general = 'Email is not registered'
		return res.status(400).json(errors)
	}

	const match = await bcrypt.compare(password, user.password)
	if (!match) {
		errors.general = 'Wrong password'
		return res.status(400).json(errors)
	}

	const token = generateToken(user)

	return res.status(200).json({
		...user._doc,
		id: user._id,
		token,
	})
})

router.get('/me', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
		return res.status(200).json(user)
	} catch (e) {
		return res.status(500).send({ error: 'Error in fetching user' })
	}
})

router.get('/all', auth, (req, res) => {
	User.find({})
		.then(data => {
			return res.status(200).json(data)
		})
		.catch(err => {
			return res.status(500).json({ error: err })
		})
})

module.exports = router
