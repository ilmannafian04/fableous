import React from 'react';

import { Switch, Route, BrowserRouter } from "react-router-dom";
import { routes } from "./routes";

import './App.css'
import axios from 'axios';
import { baseUrl, httpProtocol } from '../../constant/url';

function App() {
    axios.defaults.baseURL = baseUrl(httpProtocol);
    const pages = routes.map((route, int) => <Route
        component={route.component}
        exact={route.exact}
        path={route.path}
        key={int}
    />);

    return (
        <BrowserRouter>
            <Switch>
                {pages}
            </Switch>
        </BrowserRouter>
    );
}

export default App;
