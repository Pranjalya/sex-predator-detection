const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

module.exports = function (req, res, next) {
	const token = req.header('token')
	if (!token) return res.status(401).json({ message: 'Auth Error' })

	try {
		const decoded = jwt.verify(token, SECRET_KEY)
		req.user = decoded
		next()
	} catch (e) {
		console.error(e)
		res.status(500).send({ message: 'Invalid Token' })
	}
}
