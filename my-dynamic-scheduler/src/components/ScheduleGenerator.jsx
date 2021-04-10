import React from 'react';
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
            startTime: "08:30",
            endTime: "20:00",
            tasks: [],
            events: [],
            displayedSchedule: localStorage.getItem('schedule'),
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

    handleStartTime = (e) => {
        e.preventDefault();
        this.setState({startTime: e.target.value});
    }
    handleEndTime = (e) => {
        e.preventDefault();
        this.setState({endTime: e.target.value});
    }

    insertAt = (array, index, ...elementsArray) => {
        array.splice(index, 0, ...elementsArray);
    }

    createScheduleString = (schedule) => {
        let result = [];

        for(let i = 0; i < schedule.length; i++){
            result.push(`${schedule[i].startTime} - ${schedule[i].endTime} - ${schedule[i].title} | `);
        }
        result[result.length-1] = result[result.length-1].slice(0, -3);
        localStorage.setItem('schedule', result);
        this.setState({displayedSchedule: result}); 
    }

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
        
        
        let startTime = this.state.startTime;
        let endTime = this.state.endTime;
        // let startTime = "08:30";
        // let endTime ="18:00";
        let fullStartTime = currentDate + 'T' + startTime + ":00";
        let dateObj = parseISO(fullStartTime);
        let timeFormat = "HH:mm";
        let timeAdded = "";
        let todayEvents = [];
    
        for (let j = 0; j < events.length ; j++){
            if (events[j].date === currentDate){
                let temp = parseISO(currentDate + 'T' + events[j].time + ":00");
                temp = addMinutes(temp, events[j].duration);
                temp = format(temp, timeFormat);
                todayEvents.push(JSON.parse(`{"startTime":"${events[j].time}","endTime":"${temp}", "title":"${events[j].title}"}`)); //Add scheduler object
            }
        }
        todayEvents.sort(function(a,b) { //Sort events to be in order of time
            let startA = a.startTime;
            let startB = b.startTime;

            if (startA === startB) {
                return 0;
            }
            else if (startA > startB) {
                return 1;
            }
            else if (startA < startB) {
                return -1;
            }
            return 0;
        });
        for (let j = 0; j < todayEvents.length; j ++){
                
            schedule.push(todayEvents[j]);
            
        }
        let count = 0;
        let scheduleIndex = 0;
        let i = 0;
        let tempStartTime = dateObj;
        while (i < tasks.length){

            //console.log(schedule);

            //Create object that is startTime + task duration
            timeAdded = addMinutes(tempStartTime, parseInt(tasks[i].duration));
            timeAdded = format(timeAdded, timeFormat);
            if (timeAdded > endTime) {
                break;
            } else if (count > todayEvents.length) { //No more events to worry about
                let temp = parseISO(currentDate + 'T' + timeAdded + ":00");
                temp = format(temp, timeFormat);
                let taskObj = JSON.parse(`{"startTime":"${format(tempStartTime, timeFormat)}","endTime":"${temp}", "title":"${tasks[i].title}"}`);
                if (scheduleIndex > schedule.length-1) {
                    schedule.push(taskObj); //Push task object to array
                    scheduleIndex += 1;
                } else {
                    this.insertAt(schedule, scheduleIndex, taskObj);
                    scheduleIndex += 1;
                }
                tempStartTime = parseISO(currentDate + 'T' + taskObj.endTime + ":00");
                i += 1;
            } else if (timeAdded > todayEvents[count].startTime) { //Task time exceeds allowed length
                //change tempStartTime to todayEvents[count].endTime, Increment count by one
                if (todayEvents[count].endTime > format(dateObj, timeFormat)) {
                    tempStartTime = parseISO(currentDate + 'T' + todayEvents[count].endTime + ":00");
                    
                } 
                count += 1;
                scheduleIndex += 1;

            } else { //Task does not conflict with event, add task at index of schedule
                let temp = parseISO(currentDate + 'T' + timeAdded + ":00");
                temp = format(temp, timeFormat);
                let taskObj = JSON.parse(`{"startTime":"${format(tempStartTime, timeFormat)}","endTime":"${temp}", "title":"${tasks[i].title}"}`);
                if (scheduleIndex > schedule.length-1) {
                    schedule.push(taskObj); //Push task object to array
                    scheduleIndex += 1;
                } else {
                    this.insertAt(schedule, scheduleIndex, taskObj);
                    scheduleIndex += 1;
                }
                tempStartTime = parseISO(currentDate + 'T' + taskObj.endTime + ":00");
                i += 1;
            }
                
        }
        //Function to convert schedule to printable array
        if (schedule.length > 0){
          this.createScheduleString(schedule);  
        }
        
    }

    
    render = () =>{
        return (
            <div className="ScheduleGenerator">
            <h1>Schedule for the day!</h1>
                <form>
                    <label>Start time: </label>
                    <input type="time" name="startTime"  onChange={this.handleStartTime}/>
                    
                    <label>End time: </label>
                    <input type="time" name="endTime" onChange={this.handleEndTime}/>

                    <button type="submit" onClick={this.scheduler}>Generate Your Schedule For Today!</button>
                </form>
                <p>{this.state.displayedSchedule}</p>

            <p>This schedule displays the tasks that are due first and listed from easiest to hardest. It also includes the events you have scheduled for the day.</p>           
            </div>
        );
    
    }

    
}

export default ScheduleGenerator;