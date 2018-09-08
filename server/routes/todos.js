const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo')

const auth =  require('../helpers/auth')

router.get('/', auth, todoController.getTodos)

module.exports = router;