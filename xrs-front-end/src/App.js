import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from "./components/Login";
import NotFound from "./pages/NotFound";
import CreateAccount from './pages/CreateAccount';

function App() {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/createaccount' component={CreateAccount}/>
            <Route exact path='*' component={NotFound}/>
        </Switch>
    );
}

export default App;
