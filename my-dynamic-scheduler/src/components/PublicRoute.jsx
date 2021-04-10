import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../js_functions/IsLogin';

/*
    Routes to Component unless it is considered restricted, then it will route to home
        Currently no restricted components, but this allows to expand admin tools later
*/

const PublicRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            !isLogin() ?
                <Component {...props} />
            : <Redirect to="/home" />
        )} />
    );
};

export default PublicRoute;