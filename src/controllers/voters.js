const VoterModel = require('../models/voters');
const party = require('../models/party');

const Voters = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  addVoter(req, res) {
    const register_state = req.register_state
    if(register_state === 'register_in_session'){
      const voter_tag = req.body.voter_tag
      const finger_print = req.body.finger_print
      console.log('voter_tag: ', voter_tag)
      console.log('finger_print: ', finger_print)
      if ((typeof voter_tag === 'undefined') || (typeof finger_print === 'undefined')) { 
        console.log('empty fields')
        return res.send({'Error': 'All fields are required'})
      }
      const voter = VoterModel.add(req.body);
      const data = {
        'success': 'Successfully register an eligible voter.',
        'voter detail': voter
      }
      console.log('Successfully register an eligible voter.')
      return res.send(data);
    }
    else if(register_state === 'register_has_finished'){
      const data = {
        'Error': 'register process has finished!'
      }
      return res.json(data);
    }

    else if(register_state === 'register_has_not_started'){
      const data = {
        'Error': 'register process has not started!'
      }
      return res.json(data);
    }    
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} reflections array
   */
  getTotalVoters(req, res) {
    const total_voter = VoterModel.findTotalVoters();
    console.log(total_voter)
    return res.status(200).json({'total_voter': total_voter})
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */
  getOne(req, res) {
    const voter_tag = req.params.id
    console.log('voter_tag: ' + voter_tag)
    const voter = VoterModel.findOne(voter_tag);
    if (!voter) {
      return res.status(404).send({'message': 'voter not found'});
    }
    return res.status(200).json(voter);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated voter
   */
  update(req, res) {
    const voter_tag = req.params.id
    const voter = VoterModel.findOne(voter_tag);
    const updateAccreditParam = req.body.accredited
    const updateVotedParam = req.body.voted
    const partyVoted = req.body.party
    if (!voter) {
      return res.status(404).send({'Error': 'voter not found'});
    }

    //check query parameters if empty
    if(!updateAccreditParam && !updateVotedParam){
      return res.status(404).send({'Error': 'No update parameter found'});
    }

    //update voter accredition
    if(updateAccreditParam === true){
      const accredit_state = req.accredit_state
      if(accredit_state === 'accredit_in_session'){
        let value = 'accredited'
        let update = VoterModel.update(voter_tag, value)
        const responseData = {
           'voter': update,
           'message': 'You have been accredited successfully!'
         
        }
        return res.status(202).send(responseData);
      }

      else if(accredit_state === 'accredit_has_finished'){
        const data = {
          'Error': 'accredit process has finished!'
        }
        return res.json(data);
      }

      else if(accredit_state === 'accredit_has_not_started'){
        const data = {
          'Error': 'accredit process has not started!'
        }
        return res.json(data);
      } 
    }

    //update voter vote
    if(updateVotedParam === true){
      const vote_state = req.vote_state
      if(vote_state === 'vote_in_session'){
        let value = 'voted'
        let update = VoterModel.update(voter_tag, value)
        if (!update) {
          return res.status(404).json({
            'Error': 'Voter has not been accredited!'
          })
        }
        const party_to_vote_for = party.findIndex(obj => {
          return obj.party_accronym === partyVoted
        })

        console.log(party_to_vote_for)
        party[party_to_vote_for].vote_count++

        console.log(party[party_to_vote_for])

        const responseData = {
           'voter': update,
           'message': 'You have voted successfully!'
         
        }
        return res.status(202).send(responseData);
      }

      else if(vote_state === 'vote_has_finished'){
        const data = {
          'Error': 'vote process has finished!'
        }
        return res.json(data);
      }

      else if(vote_state === 'vote_has_not_started'){
        const data = {
          'Error': 'vote process has not started!'
        }
        return res.json(data);
      } 
    }
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  delete(req, res) {
    const voter = VoterModel.findOne(req.params.voter_tag);
    if (!voter) {
      return res.sendStatus(404).send({'message': 'voter not found'});
    }
    const ref = VoterModel.delete(req.params.voter_tag);
    return res.sendStatus(204).send(ref);
  }
}


module.exports = Voters;