const moment = require('moment');
const uuid = require('uuid');

const rules = {
    'vote_start_time': new Date(2019, 4, 31, 6,20),
    'vote_stop_time': new Date(2019, 4, 31, 8,50),
    'start_accredit_time': new Date(2019, 4, 31, 6,20),
    'stop_accredit_time': new Date(2019, 4, 31, 8,50),
    'start_register_date': new Date(2019, 4, 31, 6,20), 
    'stop_register_date': new Date(2019, 4, 31, 8,50)
  }


module.exports = rules