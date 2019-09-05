// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const rules = require('../src/models/rules')
const voters = require('../src/controllers/voters')

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	//res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
	
	const data = req.data
	const results = req.results
	const vote_state = req.vote_state
	
	//render view based on vote state
	switch(vote_state){
		case 'vote_in_session':
			res.render('vote_in_session', {text: 'ss'})
			break

		case 'vote_has_finished':
			res.render('results', results)
			break

		case 'vote_has_not_started':
			res.render('vote_has_not_started', data)
			break

		case 'no_election_scheduled':
			res.render('no_election_scheduled', data)
			break
	}
})


// go to 
router.get('/goto_sign_in', (req, res) => {
	//res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
	res.render('sign_in_page', {text: 'Admin'})
})

/* This is the signin entry point*/
router.post('/admin', (req, res) => {
	const admin = {
		name: 'Tayo',
		password: '1234'
	}

	const adminData = req.body
	if (admin.name !== adminData.user || admin.password !== adminData.password){
		res.render('error', {error: 'confirmation Failed,  wrong user name or password'})
	}
	else{
		res.render('admin')
	} 
})

/*  This route render json data */
router.post('/rules', (req, res) => {
	const data = {
		startVoteTime : req.body.startVoteTime,
		stopVoteTime : req.body.stopVoteTime,
		startVoteDate : req.body.startVoteDate,
		stopVoteDate : req.body.stopVoteDate,

		startRegsiterTime : req.body.startRegsiterTime,
		stopRegisterTime : req.body.stopRegisterTime,
		startRegsiterDate : req.body.startRegsiterDate,
		stopRegisterDate : req.body.stopRegisterDate,

		startAccreditTime : req.body.startAccreditTime,
		stopAccreditTime : req.body.stopAccreditTime,
		startAccreditDate : req.body.startAccreditDate,
		stopAccreditDate : req.body.stopAccreditDate
	}

	//get the variables for the rules model
	start_vote_time =  data.startVoteDate + 'T' + data.startVoteTime + 'Z'
	stop_vote_time =  data.stopVoteDate + 'T' + data.stopVoteTime + 'Z'
	start_accredit_time =  data.startAccreditDate + 'T' + data.startAccreditTime + 'Z'
	stop_accredit_time =  data.stopAccreditDate + 'T' + data.stopAccreditTime + 'Z'
	start_register_date =  data.startRegsiterDate + 'T' + data.startRegsiterTime + 'Z'
	stop_register_date =  data.stopRegisterDate + 'T' + data.stopRegisterTime + 'Z'


	rules.start_vote_time = new Date(start_vote_time)
	rules.stop_vote_time = new Date(stop_vote_time)
	rules.start_accredit_time = new Date(start_accredit_time)
	rules.stop_accredit_time = new Date(stop_accredit_time)
	rules.start_register_date = new Date(start_register_date)
	rules.stop_register_date = new Date(stop_register_date)

	console.log(rules)
	// res.json({
	// 	confirmation: 'success',
	// 	//app: process.env.TURBO_APP_ID,
	// 	data: data,
	// 	rules1: rules.vote_start_time,
	// 	rules2: rules.vote_start_time,
	// 	rules3: rules.vote_start_time,
	// 	rules4: rules.vote_start_time,
	// 	rules5: rules.vote_start_time,
	// 	rules6: rules.vote_start_time
	// })

	// delete voter data to start a new voting sesion
	//voters.deleteAll()

	//redirect the route back to home
	res.redirect('/api/v1/deleteAll')
})



module.exports = router
