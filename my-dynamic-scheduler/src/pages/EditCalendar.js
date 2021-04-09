import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Header from '../components/Header.jsx';
import EventList from '../components/EventList.jsx';
import TaskList from '../components/TaskList.jsx';

class Home extends React.Component {



    render() {
        return (
            <div className="Edit Calendar">
                <Header />
                <NavBar />
                <EventList />
                <br />
                <br />
                <TaskList />
            </div>
        );
    }
}

export default Home;