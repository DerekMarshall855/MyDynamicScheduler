import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Header from '../components/Header.jsx';
import ScheduleGenerator from '../components/ScheduleGenerator.jsx';


class ScheduleGeneratorPage extends React.Component {



    render() {
        return (
            <div className="ScheduleGeneratorPage">
                <Header />
                <NavBar />
                <ScheduleGenerator />
            </div>
        );
    }
}

export default ScheduleGeneratorPage;