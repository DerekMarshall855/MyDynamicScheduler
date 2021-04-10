import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Header from '../components/Header.jsx';
import Calendar from '../components/Calendar.jsx';
import AddEvent from '../components/AddEvent.jsx';
import AddTask from '../components/AddTask.jsx';


class CalendarPage extends React.Component {

    render() {
        return (
            <div className="CalendarPage">
                <Header />
                <NavBar />
                <div className="addEventsTasks">
                    <div className="add-container event">
                        <AddEvent />
                    </div>
                    <div className="add-container task"> 
                        <AddTask />
                    </div>
                </div>
                <Calendar />
            </div>
        );
    }
}

export default CalendarPage;