const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { MONGO_URI, PORT } = require('./config')

const app = express()

// Body Parser middleware
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
)
app.use(bodyParser.json())

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('Database succefully connected'))
	.catch(err => console.log(err))

const port = PORT || 8080

app.listen(port, () => console.log(`Server running on port #${port}`))
