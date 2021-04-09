import React from 'react';
import {parseISO, format, addMinutes, getMinutes, getHours} from "date-fns";

class ScheduleGenerator extends React.Component{
    state = {
        startTime: "",
        endTime: "",
        startDate: "",
        currentDay: new Date()
    };

    displayDaySchedule = (e) => {
        e.preventDefault();
        console.log("Clicked display");
        this.schedule();
    }

    getTimes = (e, arg) => {
        if (arg === "startTime"){
            this.setState({startTime: e.target.value});
            console.log("Got start time: " + this.state.startTime);
        }
        else if (arg === "endTime"){
            this.setState({endTime: e.target.value});
            console.log("Got end time: " + this.state.endTime);
        }
        else if (arg === "startDate"){
            this.setState({startDate: e.target.value})
            console.log("Got date: " + this.state.startDate);
        }

    }

    schedule() {

        let startTime = this.state.startDate + 'T' + this.state.startTime +":00";
        let endTime = this.state.startDate + 'T' + this.state.endTime + ":00";
        let todayDate = parseISO(startTime);
        let end = parseISO(endTime);

        let startHour = getHours(todayDate);
        let endHour = getHours(end);
        let duration = (endHour - startHour) * 60;
                    

        if (getMinutes(end) !== 0){
            duration += getMinutes(end);
        }

        const timeFormat = "HH:mm";
        let times = [];

        for (let i = 30; i < duration; i+=30){
            let formattedTime = format(todayDate, timeFormat);
            times.push(formattedTime);
            todayDate = addMinutes(todayDate, 30);   
        }

        console.log(times);
        
        return times;
        
    }
    

    render(){
        return (
            <div className="ScheduleGenerator">
                <p>All tasks will be displayed here</p>
                <form onSubmit={this.displayDaySchedule}>
                    <label>Date you want to make the schedule for: </label>
                    <input type="date" name="startDate" onChange={ (e) => this.getTimes(e, 'startDate')}/>

                    <label>Start time: </label>
                    <input type="time" name="startTime"  onChange={ (e) => this.getTimes(e, 'startTime')}/>
                    
                    <label>End time: </label>
                    <input type="time" name="endTime" onChange={ (e) => this.getTimes(e, 'endTime')}/>
                    <button type="submit">Generate Your Schedule For Today!</button>
                </form>
                <p className="schedule"> </p>
            </div>
        );

    }

}

export default ScheduleGenerator;