import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Header from '../components/Header.jsx';
import Calendar from '../components/Calendar.jsx';
import AddEvent from '../components/AddEvent.jsx';


class CalendarPage extends React.Component {



    render() {
        return (
            <div className="CalendarPage">
                <Header />
                <NavBar />
                <AddEvent />
                <Calendar />
            </div>
        );
    }
}

export default CalendarPage;