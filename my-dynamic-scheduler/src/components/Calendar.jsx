import React from "react";
import task_api from "../api/task_api.js";
import event_api from "../api/event_api.js";
import dayCheck from "../js_functions/DayCheck.js";
import { subMonths, addMonths, isSameMonth, startOfWeek, endOfWeek, addDays, format, startOfMonth, endOfMonth, isSameDay} from "date-fns";

class Calendar extends React.Component {

    constructor() {
      super();
      this.state = {
        currentMonth: new Date (),
        selectedDate: new Date (),
        tasks: [],
        events: []
      }; 
    }

    componentDidMount = async () => {
      try {
          await task_api.getTasks().then(res => {
              //Search successful, res is now a list of tasks
              //console.log(res.data);
              this.setState({tasks: res.data.data});

              
          });
      } catch {
        console.log("There are no tasks in the db");
      }
      try {
        await event_api.getEvents().then(res => {
            //Search successful, res is now a list of tasks
            //console.log(res.data);
            this.setState({events: res.data.data});

        });
      } catch {
        console.log("There are no events in the db");
      }
    }

    renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={this.prevMonth}>
                chevron_left
                </div>
            </div>
            <div className="col col-center">
                <span>
                {format(this.state.currentMonth, dateFormat)}
                </span>
            </div>
            <div className="col col-end" onClick={this.nextMonth}>
                <div className="icon">chevron_right</div>
            </div>
            </div>
    );
  }
    renderDays = () => {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
        const days = [];
        for (let i = 0; i < 7; i++) {
          days.push(
            <div className="col col-center" key={i}>
             {dayNames[i]}
            </div>
          );
        }
        return <div className="days row">{days}</div>;
    }
    
    renderCells = () => {
        //console.log(this.state);
        const { currentMonth, selectedDate } = this.state;

        //First Day of the month eg. April 1
        const monthStart = startOfMonth(currentMonth);

        //Last Day of the Month eg. April 30
        const monthEnd = endOfMonth(monthStart);

        //First sunday of the calendar month eg. March 28
        const startDate = startOfWeek(monthStart);
       
        //Last saturday of the calendar month eg. May 1
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            let temp = dayCheck(this.state.events, this.state.tasks, day.toISOString().split('T')[0]); //Check tasks/events on this day, creates string for printing
            formattedDate = format(day, dateFormat);
            days.push(
            <div
                className={`col cell ${
                !isSameMonth(day, monthStart)
                    ? "disabled"
                    : isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                key={day}
            >
                <p className="temp">{temp}</p> {/*Adds all events/tasks to calendar day*/}
                <span className="number">{formattedDate}</span>
            </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
            {days}
            </div>
        );
        days = [];
        }
        return <div className="body">{rows}</div>;
    }

    nextMonth = () => {
      this.setState({
        currentMonth: addMonths(this.state.currentMonth, 1)
      });
    };
  
    prevMonth = () => {
        this.setState({
        currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };


    /*
      Couldnt do an async render, learned function componentDidMount rerenders when this.state updates.
      Check if events and tasks are updated to lists, default before fetch they are strings.
      When both ready, render actual page. Page technically renders 3 times (2 empty divs, 1 actual render), but its the best we could do for now
    */
    render = () => {
        if (typeof this.state.events === 'string' || typeof this.state.tasks === 'string' ) {
          return (
            <div></div>
          );
        } else {
          return (
            <div className="calendar">
              {this.renderHeader()}
              {this.renderDays()}
              {this.renderCells()}
            </div>
          );
        }
      }
    }

export default Calendar;