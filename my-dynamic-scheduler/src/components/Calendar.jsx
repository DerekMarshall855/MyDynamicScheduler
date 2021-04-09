import React from "react";
import { subMonths, addMonths, isSameMonth, startOfWeek, endOfWeek, addDays, format, startOfMonth, endOfMonth, isSameDay} from "date-fns";

class Calendar extends React.Component {
    state = {
        currentMonth: new Date (),
        selectedDate: new Date ()
    };

    renderHeader(){
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
    renderDays(){
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
    
    renderCells(){
        const { currentMonth, selectedDate } = this.state;

        //First Day of the month eg. April 1
        const monthStart = startOfMonth(currentMonth);
        console.log(monthStart);
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
        /*
          - Do API calls to get a list of all tasks and events (See AddEvent.jsx and AddTask.jsx at the top for reference) in 2 variables
          - When looping, check if current day == day of event/task
          - If true edit day/edit div (For now just change colour)
        */
        while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
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

    render() {
        return (
          <div className="calendar">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
        );
      }
    }

export default Calendar;