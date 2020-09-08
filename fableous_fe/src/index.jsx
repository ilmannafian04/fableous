import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { baseUrl, httpProtocol } from './constant/url';
import App from './containers/App/App';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';

axios.defaults.baseURL = baseUrl(httpProtocol);

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <CssBaseline />
            <App />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
