const User = require('../models/User')
const Todo = require('../models/Todo')
const jwt = require('jsonwebtoken')
const axios = require('axios')

class Controller {
  
  static getTodos(req, res) {
    User.findById(req.decoded.id)
      .populate('todos')
      .then(user => {
        res.status(200).json(user.todos)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  }
  
  static addTodo(req, res) {
    Todo.create(req.body)
      .then(newTodo => {
        let todoId = newTodo._id
    
        User.update({_id: req.decoded.id}, {$push: {todos: todoId}})
          .then(() => {
            res.status(200).json({message: 'Todo added!'})
          })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static deleteTodo(req, res) {
    let todoId = req.params.id
    
    Todo.deleteOne({_id: todoId})
      .then(() => {
        let userId = req.decoded.id
        
        User.update({_id: userId}, {$pull: {todos: todoId}})
          .then(() => {
            res.status(200).json({message: 'Todo deleted!'})
          })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}

module.exports = Controller