const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()

const { SECRET_KEY } = require('../config')

const { validateSignUpData, validateLoginData } = require('../util/validators')

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
			expiresIn: '7h',
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
		return res.status(400).json({
			errors: {
				handle: 'This email is already taken',
			},
		})
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

	const match = await bcrypt.compare(req.body.password, user.password)
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

module.exports = router
