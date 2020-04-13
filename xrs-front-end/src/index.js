import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { Provider } from 'react-redux';
const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
window.onbeforeunload = function () {
    localStorage.clear();
    return this.alert("Your informations will be lost on page quit.")
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider >, document.getElementById('root'));

serviceWorker.unregister();
