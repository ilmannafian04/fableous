import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App/App';
import './index.css';

axios.defaults.baseURL = 'https://deco3801-todo-team-name.uqcloud.net';
// axios.defaults.baseURL = 'http://127.0.0.1:8000/';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
