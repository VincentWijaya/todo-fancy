const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo')

const {auth} =  require('../helpers/auth')

router.get('/', auth, todoController.getTodos)
router.post('/', auth, todoController.addTodo)
router.delete('/:id', auth, todoController.deleteTodo)
router.put('/:id', auth, todoController.changeStatus)

module.exports = router;