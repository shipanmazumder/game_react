import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from './../utils/auth';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            getCookie() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;