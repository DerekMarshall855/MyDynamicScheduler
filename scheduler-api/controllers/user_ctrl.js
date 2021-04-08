const User = require('../models/user_model');
//sha1 = require('js-sha1');

//Creates user from json
createUser = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a username and password',
        });
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            });
        });
}

//Deletes user if they exist
deleteUser = async (req, res) => {
    await User.findOneAndDelete({ username: req.params.username }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
}

// Checks to see if user exists in DB
getUserByName = async (req, res) => {
    await User.findOne({ username: req.params.username }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }
        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
}

authUser = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a username and password',
        });
    }
    await User.findOne({ username: body.username }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: 'User not found' });
        }
        if (user.password.localeCompare(body.password) != 0) {
            return res
                .status(404)
                .json({ success: false, error: 'Password does not match' });
        }
        return res.status(200).json({success: true, message: "User authenticated"});
    }).catch(err => console.log(err));
}

module.exports = {
    createUser,
    deleteUser,
    getUserByName,
    authUser
}