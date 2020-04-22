import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { Provider } from 'react-redux';
import jwt from "jwt-decode";

function loadFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('user_info'));

    if (users === null) {
        return undefined;
    }


    return jwt(users);
}
const savedInfo = loadFromLocalStorage();

const store = createStore(rootReducer,
    {
        user_information: savedInfo
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider >, document.getElementById('root'));

serviceWorker.unregister();
