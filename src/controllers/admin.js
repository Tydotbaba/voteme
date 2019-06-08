const AdminModel = require('../models/admin');

const Admin = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  addAdmin(req, res) {
      const name = req.body.name
      const password = req.body.password
      console.log('name: ', name)
      console.log('password: ', password)
      if ((typeof name === 'undefined') || (typeof password === 'undefined')) { 
        console.log('empty fields')
        return res.send({'Error': 'All fields are required'})
      }
      const admin = AdminModel.add(req.body);
      const data = {
        'success': 'Successfully added an admin.',
        'admin detail': admin
      }
      console.log('Successfully added an  admin.')
      return res.send(data);
  },

  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */
  getOne(req, res) {
    const name = 
    console.log('name: ' + name)
    const admin = AdminModel.findOne(name);
    if (!admin) {
      return 0
    }
    return admin
  },
  
  
}


module.exports = Admin;