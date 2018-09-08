const User = require('../models/User')
const Todo = require('../models/Todo')
const jwt = require('jsonwebtoken')
const axios = require('axios')

class Controller {
  
  static getTodos(req, res) {
    console.log('DAPET TODOS');
  }
  
}

module.exports = Controller