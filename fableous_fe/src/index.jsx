import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { baseUrl, httpProtocol } from './constant/url';
import App from './containers/App/App';
import { jwtRequestInterceptor, jwtResponseInterceptor } from './utils/jwtInterceptor';
import { RecoilRoot } from 'recoil';

axios.defaults.baseURL = baseUrl(httpProtocol);
axios.interceptors.request.use(jwtRequestInterceptor);
axios.interceptors.response.use((response) => response, jwtResponseInterceptor);

ReactDOM.render(
    <BrowserRouter>
        <RecoilRoot>
            <React.StrictMode>
                <CssBaseline />
                <App />
            </React.StrictMode>
        </RecoilRoot>
    </BrowserRouter>,
    document.getElementById('root')
);
