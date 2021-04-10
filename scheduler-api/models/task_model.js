const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Defines formatting for each task, defines collection name for tasks
*/

//Create User schema
const Task = new Schema(
    {
        user: {type: String, required: true},
        title: {type: String, required: true},
        due_date: {type: String, required: true},
        difficulty: {type: String, required: true},
        duration: {type: String, required: true}
    },
    {timestamps: true},
    {collection: 'tasks'} //Put user data in users collection
);

module.exports = mongoose.model('tasks', Task);  //Define user model - using User schema