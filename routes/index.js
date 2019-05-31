// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

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
router.post('/signIn', (req, res) => {
	const body = req.body
	res.json({
		confirmation: 'success',
		data: body
	})
})

/*  This route render json data */
router.get('/admin', (req, res) => {
	res.json({
		confirmation: 'success',
		//app: process.env.TURBO_APP_ID,
		data: 'this is admin site.'
	})
})



module.exports = router
