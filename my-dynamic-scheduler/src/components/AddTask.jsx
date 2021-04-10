import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../api/task_api.js';

/*
    Form component for adding tasks, works nearly the same as AddEvent.jsx
*/

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            user: localStorage.getItem("username"),
            title: '',
            due_date: '',
            difficulty: 'easy',
            duration: '30'
        };
    }

    handleTaskChange = (e) => {
        e.preventDefault();
        this.setState({title: e.target.value});
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

    handleFormSubmit = async (e) => {
        e.preventDefault();
        var obj = JSON.parse(`{"user":"${this.state.user}","title":"${this.state.title}", "due_date":"${this.state.due_date}", "difficulty":"${this.state.difficulty}", "duration":"${this.state.duration}"}`);
        //console.log(obj);
        //Add obj to db
        if(this.state.title.localeCompare('') !== 0 && this.state.due_date.localeCompare('') !== 0) {

            try {
                await api.addTask(obj).then(res => {
                    //User successfully added, reset form and go to home
                    this.setState({
                        title: '',
                        due_date: '',
                        difficulty: 'easy',
                        duration: '30'
                    });
                });
            } catch {
                window.alert('Error, user not added');
            }

        } else {
            window.alert('You must include a title and a due date in a task');
        }
        window.location.reload(false);
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
                            <td><input type="text" value={this.state.title} onChange={this.handleTaskChange} /></td>
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