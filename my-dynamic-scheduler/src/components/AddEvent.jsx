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
                            <td><label>Description of Event: </label></td>
                            <td><input type="text" value={this.state.event} onChange={this.handleEventChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Date (DD-MM-YYYY): </label></td>
                            <td><input type="text" value={this.state.date} onChange={this.handleDateChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Time: </label></td>
                            <td><input type="text" value = {this.state.time} onChange={this.handleTimeChange} /></td>
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
                            <td><label>Recurring Event</label></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" value="Add Event">Add Event</button>
            </form>
            <div id="successful"></div>
        </div>
        );
    }
}
export default withRouter(AddEvent);