const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const todoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : 'Name cannot be blank!'
    },
    description : {
        type : String,
        required : 'Description cannot be blank!'
    },
    dueDate : {
        type : Date,
        required : 'Due date cannot be blank!'
    },
    completed : {
        type : Boolean,
        default : false
    }
}, {timestamps:true})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo