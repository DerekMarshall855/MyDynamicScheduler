import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../api/event_api.js';

/*
    Component form to add events
*/

class AddEvent extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('username'), //Get current user from localStorage
            title: '',
            date: '',
            time: '',
            duration: '30'
        };
    }

    handleEventChange = (e) => {
        e.preventDefault();
        this.setState({title: e.target.value});
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

    handleFormSubmit = async (e) => {
        e.preventDefault();
        //Create json object to add to mongo
        var obj = JSON.parse(`{"user":"${this.state.user}","title":"${this.state.title}", "date":"${this.state.date}", "time":"${this.state.time}", "duration":"${this.state.duration}"}`);
        if(this.state.title.localeCompare('') !== 0 && this.state.date.localeCompare('') !== 0 && this.state.time.localeCompare('') !== 0) {

            try {
                await api.addEvent(obj).then(res => {
                    //User successfully added, reset form and go to home
                    this.setState({
                        title: '',
                        date: '',
                        time: '',
                        duration: '30'
                    });
                });
            } catch {
                window.alert('Error, user not added');
            }

        } else {
            window.alert('You must include a title, date, and time in an event');
        }
        window.location.reload(false);
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
                            <td><input type="text" value={this.state.title} onChange={this.handleEventChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Date: </label></td>
                            <td><input type= "date" value = {this.state.date} onChange={this.handleDateChange} /> </td>
                        </tr>
                        <tr>
                            <td><label>Time: </label></td>
                            <td><input type= "time" value = {this.state.time} onChange={this.handleTimeChange} /></td>
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
                <button type="submit" value="Add Event">Add Event</button>
            </form>
            <div id="successful"></div>
        </div>
        );
    }
}
export default withRouter(AddEvent);