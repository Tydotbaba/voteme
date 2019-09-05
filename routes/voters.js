/*
*	This is the controller endpoint
*
*/

const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Voters = require('../src/controllers/voters');


router.post('/voters', Voters.addVoter);
router.get('/voters', Voters.getTotalVoters);
router.get('/voters/:id', Voters.getOne);
router.post('/voters/:id', Voters.update);
router.delete('/voters/:id', Voters.delete);
router.get('/deleteAll', Voters.deleteAll);


module.exports = router;