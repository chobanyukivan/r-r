import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from "redux";
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';

const initialState = {
    isFetching: false,
    error: '',
}
const reducer = (store = initialState, action) => {
    switch (action.type) {
        case "GET_REQUEST":
            return {
                ...store, isFetching: action.payload,
            }
        case "GET_SUCCES":
            return {
                ...store, photos: action.payload, isFetching: false,
            }
        case "GET_FAIL":
            return {
                ...store, error: action.payload, isFetching: false,
            }
        default:
            return {
                ...store, photos: ''
            }
    }
}

const store = createStore(reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
