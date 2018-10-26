import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Store } from './helpers';
import './css/styles.css'
import App from './components/App';

render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root')
)