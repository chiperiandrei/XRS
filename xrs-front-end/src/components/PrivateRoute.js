import { Route, Redirect } from "react-router-dom"
import React from "react";
import { isLogged } from "../utils";
import Dashboard from "../pages/Dashboard";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogged() ?
                <Dashboard {...props} />
                : <Redirect to="/" />
        )} />
    );
};
export default PrivateRoute;