import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../api/task_api.js';

/*
HOW TO USE API TO GET ALL TASKS:
--------------------------------------------------
import api from api/task_api.js
Do code:
    try {
        await api.getTasks().then(res => {
            //Search successful, res is now a list of tasks
            console.log(res);
        });
    } catch {
        //Whatever we do if there are no tasks currently in db
    }
*/

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            task: '',
            due_date: '',
            difficulty: 'easy',
            duration: '30'
        };
    }

    handleTaskChange = (e) => {
        e.preventDefault();
        this.setState({task: e.target.value});
    }

    handleDueDateChange = (e) => {
        this.setState({due_date: e.target.value});
    }

    handleDifficultyChange = (e) => {
        e.preventDefault();
        this.setState({difficulty: e.target.value});
    }

    handleDurationChange = (e) => {
        e.preventDefault();
        this.setState({duration: e.target.value});
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        var obj = JSON.parse(`{"task":"${this.state.task}", "due_date":"${this.state.due_date}", "difficulty":"${this.state.difficulty}", "duration":"${this.state.duration}"}`);
        console.log(obj);
        //Add obj to db
        this.props.history.push('/calendar');
    }
    render() {
        return (
            <div className="addTask">
            <h1>ADD TASK</h1>
            <form onSubmit={this.handleFormSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Description of Task: </label></td>
                            <td><input type="text" value={this.state.task} onChange={this.handleTaskChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Due Date: </label></td>
                            <td><input type= "date" value = {this.state.due_date} onChange={this.handleDueDateChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Difficulty: </label></td>
                            <td>
                                <select value={this.state.difficulty} onChange={this.handleDifficultyChange} >
                                    <option value = "easy">Easy</option>
                                    <option value = "medium">Medium</option>
                                    <option value = "hard">Hard</option>
                                </select>
                            </td>

                        </tr>
                        <tr>
                            <td><label>Duration: </label></td>
                            <td>
                                <select value = {this.state.duration} onChange={this.handleDurationChange} >
                                    <option value = "30">30 minutes</option>
                                    <option value = "60">1 hour</option>
                                    <option value = "90">1 hour 30 minutes</option>
                                    <option value = "120">2 hours</option>
                                    <option value = "150">2 hours 30 minutes</option>
                                    <option value = "180">3 hours</option>
                                    <option value = "210">3 hours 30 minutes</option>
                                    <option value = "240">4 hours</option>
                                    <option value = "270">4 hours 30 minutes</option>
                                    <option value = "300">5 hours</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" value="Recurring" /></td>
                            <td><label>Recurring Task</label></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" value = "Add Task">Add Task</button>
            </form>
            <div id="successful"></div>
            </div>
        );
    }
}
export default withRouter(AddTask);