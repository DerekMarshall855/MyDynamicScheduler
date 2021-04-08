const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create User schema
const User = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true}
    },
    {timestamps: true},
    {collection: 'users'} //Put user data in users collection
);

module.exports = mongoose.model('users', User);  //Define user model - using User schema