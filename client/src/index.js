import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';

const store = createStore(
    reducers,
    {
        dashboard: {
            project: {
                projectTitle: 'Initial project',
                projectVisibility: '-1'
            }
        }

    },
    window.devToolsExtension && window.devToolsExtension()
);

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
