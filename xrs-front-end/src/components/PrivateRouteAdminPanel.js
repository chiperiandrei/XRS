import { Route, Redirect } from "react-router-dom"
import React from "react";
import Admin from "../pages/admin/Admin"
import { isOperator } from "../utils";

const PrivateRouteAdminPanel = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isOperator() ?
                <Admin {...props} />
                : <Redirect to="/" />
        )} />
    );
};
export default PrivateRouteAdminPanel;