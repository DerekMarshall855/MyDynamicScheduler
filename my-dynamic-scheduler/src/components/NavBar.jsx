import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="topnav">
            <ul>
                <li><NavLink to="home">Home Page</NavLink></li>
                <li><NavLink to="calendar">Calendar</NavLink></li>
                <li><NavLink to="edit-calendar">Edit Calendar</NavLink></li>
                <li><NavLink to="generate-schedule">Generate Schedule</NavLink></li>
                <li><NavLink to="logout">Log Out</NavLink></li>
            </ul>
            <hr></hr>
       </div>
    );
}

export default NavBar;