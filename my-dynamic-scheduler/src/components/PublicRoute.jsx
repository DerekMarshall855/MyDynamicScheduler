import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../js_functions/IsLogin';

/*
    Routes to Component unless it is considered restricted, then it will route to home
        Currently no restricted components, but this allows to expand admin tools later
*/

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/home" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;