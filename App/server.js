const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { MONGO_URI, PORT } = require('./config')
const cors = require('cors')

const app = express()

const userRouter = require('./routes/_users')
const conversationRouter = require('./routes/_conversation')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose
	.connect(MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Database succefully connected'))
	.catch(err => console.log(err))

var server = app.listen(PORT || 8080, () => {
	console.log('server is running on port', server.address().port)
})

const io = require('socket.io').listen(server)
app.use(function (req, res, next) {
	req.io = io
	next()
})

app.use('/user', userRouter)
app.use('/conversation', conversationRouter)
