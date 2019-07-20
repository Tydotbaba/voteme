// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const moment = require('moment');
const express = require('express')


// // setup database
// const knex = require('knex')

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : 'LoveRhoda',
//     database : 'election'
//   }
// });

// //select all voters in database
// db.select('*').from('voters').then(data => {
// 	console.log(data)
// })

const app = vertex.express() // initialize app
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/*  
	Apps can also be initialized with config options as shown in the commented out example below. Options
	include setting views directory, static assets directory, and database settings. To see default config
	settings, view here: https://www.turbo360.co/docs 

const config = {
	views: 'views', 		// Set views directory 
	static: 'public', 		// Set static assets directory
	db: { 					// Database configuration. Remember to set env variables in .env file: MONGODB_URI, PROD_MONGODB_URI
		url: (process.env.TURBO_ENV == 'dev') ? process.env.MONGODB_URI : process.env.PROD_MONGODB_URI,
		type: 'mongo',
		onError: (err) => {
			console.log('DB Connection Failed!')
		},
		onSuccess: () => {
			console.log('DB Successfully Connected!')
		}
	}
}

const app = vertex.app(config) // initialize app with config options

*/


// import routes
const index = require('./routes/index')
const voters = require('./routes/voters')

//import data models 
const rules = require('./src/models/rules');
const party = require('./src/models/party');
const votersData = require('./src/models/voters');

// use middleware
app.use('/', (req, res, next) => {
	const voteState = [
		'vote_in_session',
		'vote_has_finished',
		'vote_has_not_started'
	]

	const registerState = [
		'register_in_session',
		'register_has_finished',
		'register_has_not_started'
	]

	const accreditState = [
		'accredit_in_session',
		'accredit_has_finished',
		'accredit_has_not_started'
	]

	const now = moment.now()
	let register_state = ' '
	let register_start = rules.start_register_date
	let register_end = rules.stop_register_date
	if (now < register_start)	register_state = registerState[2]
	else if ((now >= register_start) && (now <= register_end))	register_state = registerState[0]
	else register_state = registerState[1]
	

	let accredit_state = ' '
	let accredit_start = rules.start_accredit_time
	let accredit_end = rules.stop_accredit_time
	if (now < accredit_start)	accredit_state = accreditState[2]
	else if ((now >= accredit_start) && (now <= accredit_end))	accredit_state = accreditState[0]
	else accredit_state = accreditState[1]


	//get vote_start_time
	const data = {}
	data.vote_start_time = rules.start_vote_time
	data.vote_stop_time = rules.stop_vote_time

	//create reults data
	const results = {}
	results.party_A = party[0].vote_count
	results.party_B = party[1].vote_count
	results.party_C = party[2].vote_count
	results.total_votes = results.party_A + results.party_B + results.party_C
	results.registered_voters = votersData.findTotalVoters()
	results.acredited_voters = votersData.findAccredited()
	//get vote state
	let vote_state = ' '
	const vote_start = data.vote_start_time
	const vote_end = data.vote_stop_time
	if (now < vote_start)	vote_state = voteState[2]
	else if ((now >= vote_start) && (now <= vote_end))	vote_state = voteState[0]
	else vote_state = voteState[1]

	req.data = data
	req.results = results
	req.vote_state = vote_state
	req.register_state = register_state
	req.accredit_state = accredit_state
	
	console.log(req.data)
	console.log(req.results)
	console.log(req.vote_state, req.accredit_state)
	// continue
	next()
})

// set routes
app.use('/', index)
app.use('/api/v1', voters) // voters API Routes

module.exports = app