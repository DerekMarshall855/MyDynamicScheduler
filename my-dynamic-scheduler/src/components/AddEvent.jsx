import React from 'react';
import { withRouter } from 'react-router-dom';

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            date: '',
            time: '',
            duration: ''
        };
    }

    handleEventChange = (e) => {
        e.preventDefault();
        this.setState({event: e.target.value});
    }

    handleDateChange = (e) => {
        e.preventDefault();
        this.setState({date: e.target.value});
    }
    handleTimeChange = (e) => {
        e.preventDefault();
        this.setState({time: e.target.value});
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
            <div className="addEvent">
            <h1>ADD EVENT</h1>
            <form onSubmit={this.handleFormSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Event: </label></td>
                            <td><input type="text" value={this.state.event} onChange={this.handleEventChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Date: </label></td>
                            <td><input type="text" value = {this.state.date} onChange={this.handleDateChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Time: </label></td>
                            <td><input type="text" value = {this.state.time} onChange={this.handleTimeChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Duration: </label></td>
                            <td><input type="text" value = {this.state.duration} onChange={this.handleDurationChange} /></td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" value="Recurring" /></td>
                            <td><label>Recurring Event</label></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" value="Add Event">addEvent</button>
            </form>
            <div id="successful"></div>
        </div>
        );
    }
}
export default withRouter(AddEvent);