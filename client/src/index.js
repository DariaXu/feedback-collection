// redux
import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import App from './components/App';
import { Provider } from 'react-redux';
import {applyMiddleware, legacy_createStore as createStore } from 'redux';
import reducersThunk from 'redux-thunk';
import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css'

const store = createStore(reducers, {}, applyMiddleware(reducersThunk));
// ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}><App /></Provider>
);

