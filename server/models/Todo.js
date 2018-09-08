const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const todoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : 'Name cannot be blank!',
        unique: true
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

todoSchema.plugin(uniqueValidator)

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo