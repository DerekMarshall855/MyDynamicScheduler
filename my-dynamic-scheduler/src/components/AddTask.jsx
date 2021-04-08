import React from 'react';
import { withRouter } from 'react-router-dom';

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            task: '',
            due_date: '',
            difficulty: '',
            duration: ''
        };
    }

    handleTaskChange = (e) => {
        e.preventDefault();
        this.setState({task: e.target.value});
    }

    handleDueDateChange = (e) => {
        e.preventDefault();
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
        this.props.history.push('/CalendarPage');
    }
    render() {
        return (
            <div className="addTask">
            <h1>ADD TASK</h1>
            <form onSubmit={this.handleFormSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Task: </label></td>
                            <td><input type="text" value={this.state.task} onChange={this.handleTaskChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Due Date: </label></td>
                            <td><input type="text" value={this.state.due_date} onChange={this.handleDueDateChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Difficulty: </label></td>
                            <td><input type="text" value={this.state.difficulty} onChange={this.handleDifficultyChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Duration: </label></td>
                            <td><input type="text" value={this.state.duration} onChange={this.handleDurationChange} /></td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" value="Recurring" /></td>
                            <td><label>Recurring Event</label></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" value = "Add Task">addTask</button>
            </form>
            <div id="successful"></div>
            </div>
        );
    }
}
export default withRouter(AddTask);