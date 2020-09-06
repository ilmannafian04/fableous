import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import { baseUrl, httpProtocol } from './constant/url';
import App from './containers/App/App';
import './index.css';

axios.defaults.baseURL = baseUrl(httpProtocol);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
