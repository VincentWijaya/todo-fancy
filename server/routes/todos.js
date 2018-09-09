const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo')

const {auth} =  require('../helpers/auth')

router.get('/', auth, todoController.getTodos)
router.post('/', auth, todoController.addTodo)

router.get('/:id', auth, todoController.getTodo)
router.put('/:id', auth, todoController.updateTodo)
router.put('/:id/changeStatus', auth, todoController.changeStatus)
router.delete('/:id', auth, todoController.deleteTodo)

module.exports = router;