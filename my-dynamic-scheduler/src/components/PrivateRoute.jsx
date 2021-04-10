import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../js_functions/IsLogin';

/*
    Routes to Component using info in ...rest so long as user is logged in, otherwise routes back to login page
*/

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;