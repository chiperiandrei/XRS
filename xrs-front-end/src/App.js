import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CreateAccount from './pages/CreateAccount';
import ProductSearch from './pages/ProductSearch';
import ProductAdd from './pages/admin/ProductAdd';
import Admin from "./pages/admin/Admin";
import PrivateRouteAdminPanel from "./components/PrivateRouteAdminPanel";
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
function App() {

    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/createaccount' component={CreateAccount} />
            <Route exact path='/search' component={ProductSearch} />
            <Route exact path='/productadd' component={ProductAdd} />
            <PrivateRouteAdminPanel exact path="/admin" component={Admin} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='*' component={NotFound} />
        </Switch>
    );
}

export default App;
