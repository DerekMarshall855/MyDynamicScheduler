import React from 'react';
import {format, addMinutes} from "date-fns";

class ScheduleGenerator extends React.Component{
    state = {
        startTime: "",
        endTime: "",
        currentDay: new Date()
    };

    getTimes = (e, arg) => {
        if (arg === "startTime"){
            this.setState({startTime: e.target.value});
        }
        else if (arg === "endTime"){
            this.setState({endTime: e.target.value});
        }

    }

    displayDaySchedule = (e) => {
        e.preventDefault();
        let todayDate = this.state.startTime;
        const timeFormat = "HH:mm";
        let times = [];
        const rows =[];

        for (let i = 30; i < 300; i+=30){
            let formattedTime = format(todayDate, timeFormat);

            times.push(
                <div className="time row" key={todayDate}>
                <span className="time">{formattedTime}</span>
                </div>
            );
            todayDate = addMinutes(todayDate, 30);   
        }
        rows.push(
            <div className="row" key={todayDate}>
                {times}
            </div>
        );
        times = [];
        
        return <div className="body">{rows}</div>
    }
    

    render(){
        return (
            <div className="ScheduleGenerator">
                <p>All tasks will be displayed here</p>
                <form onSubmit={this.displayDaySchedule}>
                    <label>Start time: </label>
                    <input type="time" name="startTime"  onChange={ (e) => this.getTimes(e, 'startTime')}/>
                    <label>End time: </label>
                    <input type="date" name="endTime" onChange={ (e) => this.getTimes(e, 'endTime')}/>
                    <button type="submit">Generate Your Schedule For Today!</button>
                </form>
                
                <p>Today's Schedule!</p>
                {/* {this.renderSchedule()} */}
            </div>
        );

    }

}

export default ScheduleGenerator;