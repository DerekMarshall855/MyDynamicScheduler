import React from 'react';
import task_api from "../api/task_api.js";
import event_api from "../api/event_api.js";
//import {parseISO, format, addMinutes, getMinutes, getHours} from "date-fns";

/*
    Generates scheduler from event and task user data
*/

class ScheduleGenerator extends React.Component{
    constructor() {
        super();
        this.state = {
            user: localStorage.getItem('username'),
            todayDate: new Date(),
            tasks: [],
            events: []
        };   
      }

    componentDidMount = async () => {
        try {
            await task_api.getTasks(this.state.user).then(res => {
                //Search successful, res is now a list of tasks
                //console.log(res.data);
                this.setState({tasks: res.data.data});

                
            });
        } catch {
            console.log("There are no tasks in the db");
        }
        try {
            await event_api.getEvents(this.state.user).then(res => {
                //Search successful, res is now a list of tasks
                //console.log(res.data);
                this.setState({events: res.data.data});

            });
        } catch {
            console.log("There are no events in the db");
        }
    }

    displayDaySchedule = (e) => {
        e.preventDefault();
        console.log("Clicked display");
        this.schedule();
    }

    // getTimes = (e, arg) => {
    //     if (arg === "startTime"){
    //         this.setState({startTime: e.target.value});
    //         console.log("Got start time: " + this.state.startTime);
    //     }
    //     else if (arg === "endTime"){
    //         this.setState({endTime: e.target.value});
    //         console.log("Got end time: " + this.state.endTime);
    //     }
    //     else if (arg === "startDate"){
    //         this.setState({startDate: e.target.value})
    //         console.log("Got date: " + this.state.startDate);
    //     }

    // }

    schedule() {

        let tasks = this.state.tasks;

        tasks.sort(function(a,b){
            let taskA = a.difficulty;
            let taskB = b.difficulty;

            if(taskA.localeCompare(taskB) === 0) {
                return 0;
            }
            else if(taskA.localeCompare("easy") === 0) {
                return -1;
            } 
            else if(taskB.localeCompare("easy") === 0) {
                return 1;
            } 
            else if(taskA.localeCompare("medium") === 0) {
                return -1;
            } 
            else if(taskB.localeCompare("medium") === 0) {
                return 1;
            } 
        });

        console.log(tasks);
        
    }

    renderTasks = () =>{

    }
        

        // let startTime = this.state.startDate + 'T' + this.state.startTime +":00";
        // let endTime = this.state.startDate + 'T' + this.state.endTime + ":00";
        // let todayDate = parseISO(startTime);
        // let end = parseISO(endTime);

        // let startHour = getHours(todayDate);
        // let endHour = getHours(end);
        // let duration = (endHour - startHour) * 60;
                    

        // if (getMinutes(end) !== 0){
        //     duration += getMinutes(end);
        // }

        // const timeFormat = "HH:mm";
        // let times = [];

        // for (let i = 30; i < duration; i+=30){
        //     let formattedTime = format(todayDate, timeFormat);
        //     times.push(formattedTime);
        //     todayDate = addMinutes(todayDate, 30);   
        // }

        // console.log(times);
        
        // return times;
        

    
    render = () =>{
        if (typeof this.state.events === 'string' || typeof this.state.tasks === 'string' ) {
            return (
              <div></div>
            );
          } 
          else {
            return (
                <div className="ScheduleGenerator">
                    <form onSubmit={this.displayDaySchedule}>
                        {/* <label>Date you want to make the schedule for: </label>
                        <input type="date" name="startDate" onChange={ (e) => this.getTimes(e, 'startDate')}/>

                        <label>Start time: </label>
                        <input type="time" name="startTime"  onChange={ (e) => this.getTimes(e, 'startTime')}/>
                        
                        <label>End time: </label>
                        <input type="time" name="endTime" onChange={ (e) => this.getTimes(e, 'endTime')}/> */}
                        <button type="submit">Generate Your Schedule For Today!</button>
                    </form>
                    <p className="schedule"></p>
                </div>
            );
        }
    }

    
}

export default ScheduleGenerator;