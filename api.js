const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = express()
const morgan = require('morgan')
const validator = require('express-validator')
const noCache = require('./src/middlewares/no-cache')
const momentTimezone = require('moment-timezone')

// CONECT TO DATABASE
// `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`,
mongoose.connect(
	`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`,
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
).then (() => 
	console.log ('DB Connected!')
).catch (err => {
	console.log(`DB Connection Error: ${err.message}`);
});

mongoose.disconnect = () => {
    console.log('Mongo disconnect.');
    mongoose.disconnect();
}

mongoose.connection
mongoose.Promise = global.Promise

// DECLARED ROUTES
const userRoute = require('./src/routes/userRoute')

// MIDDLEWARES AND LOG
api.use(morgan('dev'))
api.use(express.urlencoded({ extended: false }))
api.use(express.json())
api.use(validator())

// Serves resources from public folder
api.use(noCache, express.static(__dirname + '/public'))
Date.prototype.toJSON = function() {
	return momentTimezone(this, 'America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss.SSS')
}

// SET HEADERS
api.use((req, res, next) => {
	res.header(
		// ALLOWED ACCESS TO API
		'Access-Control-Allow-Origin',
		'*'
	)
	res.header(
		// ALLOWED HEADERS
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	if (req.method === 'OPTIONS') {
		res.header(
			// ALLOWED METHODS
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		)
		return res.status(200).json({})
	}
	next()
})

// USED ROUTES
api.use('/api/user', userRoute)

// CATCH ERRORS
api.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})

api.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message
		}
	})
})

module.exports = api