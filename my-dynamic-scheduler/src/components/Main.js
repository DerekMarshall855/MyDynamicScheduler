import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Login}></Route>
        </Switch>
    );
}

export default Main;