import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk'

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    reducers
)

const store = createStore(
    allStoreEnhancers,
    window.devToolsExtension && window.devToolsExtension()
);

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
