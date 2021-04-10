const Task = require('../models/task_model');

//Creates event from json
createTask = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a proper task info',
        });
    }

    const task = new Task(body);
    if (!task) {
        return res.status(400).json({ success: false, error: err });
    }

    task
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: task._id,
                message: 'Task created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Task not created!',
            });
        });
}

//Deletes task if they exist
deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!task) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }

        return res.status(200).json({ success: true, data: task });
    }).catch(err => console.log(err));
}

//Gets all tasks of user
getTasks = async (req, res) => {
    await Task.find({user: req.params.username}, (err, tasks) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!tasks.length) {
            return res
                .status(404)
                .json({success: false, error: 'Task not found'});
        }
        return res.status(200).json({success: true, data:tasks});
    }).catch(err => console.log(err));
}

module.exports = {
    createTask,
    deleteTask,
    getTasks
}