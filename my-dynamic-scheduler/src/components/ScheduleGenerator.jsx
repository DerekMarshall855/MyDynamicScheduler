import React, {useState} from 'react';
import task_api from "../api/task_api.js";
import event_api from "../api/event_api.js";
import {parseISO, format, addMinutes} from "date-fns";

/*
    Generates scheduler from event and task user data
*/

class ScheduleGenerator extends React.Component{
    constructor() {
        super();
        this.state = {
            user: localStorage.getItem('username'),
            todayDate: new Date(),
            startTime: "",
            endTime: "",
            tasks: [],
            events: [],
            displayedSchedule: "",
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

    // handleStartTime = (e) => {
    //         e.preventDefault();
    //         this.setState({startTime: e.target.value});
    // }

    // handleEndTime= (e) => {
    //     e.preventDefault();
    //     this.setState({endTime: e.target.value})
    // }
    // displayDaySchedule = (e) => {
    //     e.preventDefault();
    //     console.log("Clicked display");
    //     this.schedule();
    // }


    scheduler = (e) => {
        e.preventDefault();
  
       let tasks = this.state.tasks;
       let events = this.state.events;

       tasks.sort(function(a,b){
        let taskA = a.difficulty;
        let taskB = b.difficulty;
        let taskC = a.due_date;
        let taskD = b.due_date;

        if (taskC < taskD){
            return -1;
        }
        else if(taskC > taskD){
            return 1;
        }
        else if(taskA.localeCompare(taskB) === 0) {
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
        return 0;
        });

        let schedule =[];
        let date = this.state.todayDate;
        let currentDate = date.toISOString().split('T')[0];
        
        
        // let startTime = this.state.startTime;
        // console.log(startTime);
        // let endTime = this.state.endTime;
        // console.log(endTime);
        let startTime = "08:30";
        let endTime ="18:00";
        let fullStartTime = currentDate + 'T' + startTime + ":00";
        let dateObj = parseISO(fullStartTime);
        let timeFormat = "HH:mm";
        let tempEndTime = format(dateObj, timeFormat);
        let timeAdded = "";
        let slot = [];
        let todayEvents = [];
    
        for (let j = 0; j < events.length ; j++){
            if (events[j].date === currentDate){
                todayEvents.push(events[j]);
            }
        
        }
        for (let j = 0; j < todayEvents.length; j ++){
                
            let eventStartTime = currentDate + 'T' + todayEvents[j].time+ ":00";
            
            let dateObjEvent = parseISO(eventStartTime);
            timeAdded = addMinutes(dateObjEvent, parseInt(todayEvents[j].duration));

            //formate the date object into standard hh:mm time
            tempEndTime = format(timeAdded, timeFormat);

            schedule.push(todayEvents[j].time + "-" + tempEndTime);
            schedule.push(" ");
            schedule.push(todayEvents[j].title);
            schedule.push("|");
            
        }

        for (let i = 0; i < tasks.length ; i++){
        

            console.log(schedule);

            //start time as date object time plus duration in minutes eg. Thurs April 8 11:30:00
            timeAdded = addMinutes(dateObj, parseInt(tasks[i].duration));

            //dateObj now end time Thurs April 8 12:30:00
            dateObj = timeAdded;

            //formate the date object into standard hh:mm time 12:30
            tempEndTime = format(dateObj, timeFormat);

            if (tempEndTime >= endTime){
                break;
            }
            else if(i < todayEvents[i].length)
                if (format((addMinutes(dateObj, parseInt(tasks[i].duration))), timeFormat) < todayEvents[i].time ){
                    index = schedule.indexOf(todayEvents[i].title);
                    schuedule.splice()
                }
            // else { 
            //     //startTime is old formattedTime (end time of prev) 
            //     schedule.push(tasks[j].time + "-" + tempEndTime);
            //     schedule.push(" ");
            //     schedule.push(tasks[i].title);
            //     schedule.push("|");
  
            //     //change end task time to new start time
            //     startTime = tempEndTime;
            // }
                
        }
        
        this.setState({displayedSchedule: schedule}); 
        
    }

    
    render = () =>{
        return (
            <div className="ScheduleGenerator">
            <h1>Schedule for the day!</h1>
                <form>
{/* 
                    <label>Start time: </label>
                    <input type="time" name="startTime"  onChange={this.handleStartTime}/>
                    
                    <label>End time: </label>
                    <input type="time" name="endTime" onChange={this.handleEndTime}/> */}

                    <button type="submit" onClick={this.scheduler}>Generate Your Schedule For Today!</button>
                </form>
                <p>{this.state.displayedSchedule}</p>

            <p>This schedule displays the tasks that are due first and listed from easiest to hardest.</p>           
            </div>
        );
    
    }

    
}

export default ScheduleGenerator;