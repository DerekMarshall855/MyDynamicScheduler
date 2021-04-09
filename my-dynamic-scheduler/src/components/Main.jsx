import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import CalendarPage from '../pages/CalendarPage';
import ScheduleGeneratorPage from '../pages/ScheduleGeneratorPage';
import Logout from '../pages/Logout';
import EditCalendar from '../pages/EditCalendar';


const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/home' component={Home}></Route>
            <Route exact path='/signup' component={Signup}></Route>
            <Route exact path='/calendar' component={CalendarPage}></Route>
            <Route exact path='/logout' component={Logout}></Route>
            <Route exact path='/generate-schedule' component={ScheduleGeneratorPage}></Route>
            <Route exact path='/edit-calendar' component={EditCalendar}></Route>
        </Switch>
    );
}

export default Main;