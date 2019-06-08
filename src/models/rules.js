const moment = require('moment');
const uuid = require('uuid');

const rules = {
    'vote_start_time': new Date(2019, 5, 7, 9, 0),
    'vote_stop_time': new Date(2019, 5, 10, 12, 0),
    'start_accredit_time': new Date(2019, 5, 7, 9, 00),
    'stop_accredit_time': new Date(2019, 5, 10, 12, 0),
    'start_register_date': new Date(2019, 5, 7, 9, 0), 
    'stop_register_date': new Date(2019, 5, 10, 12, 0)
  }


module.exports = rules