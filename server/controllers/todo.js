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
        res.status(500).json(err)
      })
  }
  
  static addTodo(req, res) {
    Todo.create(req.body)
      .then(newTodo => {
        let todoId = newTodo._id
    
        User.updateOne({_id: req.decoded.id}, {$push: {todos: todoId}})
          .then(() => {
            res.status(200).json({message: 'Todo added!'})
          })
      })
      .catch(err => {
        res.status(500).json(err.message)
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
  
  static changeStatus(req, res) {
    let todoId = req.params.id
    
    Todo.updateOne({_id: todoId}, {completed: true})
      .then(() => {
        res.status(200).json({message: 'Todo status updated!'})
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static getTodo(req, res) {
    let todoId = req.params.id
    
    Todo.findById(todoId)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static updateTodo(req, res) {
    let id = req.params.id
    
    let obj = {
      name: req.body.todoName,
      description: req.body.todoDesc,
      dueDate: req.body.dueDate
    }
    
    Todo.updateOne({_id: id}, obj, {runValidators: true})
    .then(() => {
      res.status(200).json({message: 'Todo updated!'})
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
    
  }

}

module.exports = Controller