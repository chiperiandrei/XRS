import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

function App() {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='*' component={NotFound}/>
        </Switch>
    );
}

export default App;
