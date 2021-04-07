import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Calendar from './Calendar';
import Logout from '../pages/Logout';


const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/home' component={Home}></Route>
            <Route exact path='/signup' component={Signup}></Route>
            <Route exact path='/calendar' component={Calendar}></Route>
            <Route exact path='/logout' component={Logout}></Route>
        </Switch>
    );
}

export default Main;