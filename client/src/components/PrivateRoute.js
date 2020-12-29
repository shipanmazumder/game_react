import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import { Spinner } from './shared/Spinner';
const PrivateRoute = ({component: Component,auth, ...rest}) => {
    return (
        
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
         auth.isAuth ?
                <Component {...props} />
            : (auth.isLoading?<Spinner />:<Redirect  to={{
                pathname:'/login',
                state:{from:props.location}
            }} />)
        )} />
    );
};
const mapStateToProps = (state) => ({
    auth: state.auth,
  });
export default connect(mapStateToProps)(PrivateRoute);