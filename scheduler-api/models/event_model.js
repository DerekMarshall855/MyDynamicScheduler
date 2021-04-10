const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Defines formatting for each event, defines collection name for events
*/

//Create User schema
const Event = new Schema(
    {
        user: {type: String, required: true},
        title: {type: String, required: true},
        date: {type: String, required: true},
        time: {type: String, required: true},
        duration: {type: String, required: true}
    },
    {timestamps: true},
    {collection: 'events'} //Put user data in users collection
);

module.exports = mongoose.model('events', Event);  //Define user model - using User schema