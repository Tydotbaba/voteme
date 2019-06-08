//this is the admin database

class Admin {
  /*
  *class constructor
  *@params {Object} data 
  */
  constructor() {
    this.administrator = [];
  }
  
  /**
   * 
   * @returns {object} voter object
   */
  add(data) {
    const newAdmin = {
      name: data.name || '',
      password: data.password || '',
    };
    this.administrator.push(newAdmin);
    return newAdmin;
  }  
    
  /**
   * 
   * @param {uuid} voter_tag
   * @returns {object} voter object
   */
  findOne(admin) {
    return this.administrator.find(admin => admin.name === name);
  }


  /**
   * 
   * @param {uuid} id 
   */
  delete(voter_tag) {
    const voter = this.findOne(voter_tag);
    const index = this.administrator.indexOf(reflection);
    this.administrator.splice(index, 1);
    return {};
  }
}


module.exports = new Admin()