import React from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/entry.nostyle';
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

    handleDateChange = date => {  
        this.setState({date: date});
    }
    handleTimeChange = time => {
        
        this.setState({time: time});
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
                            <td><label>Date: </label></td>
                            <td>
                                <DatePicker selected = {this.state.date} onChange= {this.handleDateChange}>

                                </DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Time: </label></td>
                            <td>
                                <TimePicker selected = {this.state.time} onChange={this.handleTimeChange}>
                                </TimePicker>
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