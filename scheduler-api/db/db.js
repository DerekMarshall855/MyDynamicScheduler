const mongoose = require('mongoose');

/*
    Uses mongoose to connect to db, db will be created if it does not already exist
*/

mongoose.connect('mongodb://127.0.0.1:27017/mydynamicscheduler', { useUnifiedTopology: true, useNewUrlParser: true })
        .catch(e => {
            console.error('Connection Error: ', e.message);
        });

const db = mongoose.connection;

module.exports = db;