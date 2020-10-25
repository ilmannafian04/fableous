import React, { useEffect } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './routes';

import './App.css';
import axios from 'axios';
import { baseUrl, httpProtocol } from '../../constant/url';
import userAtom from '../../atom/userAtom';
import { useSetRecoilState } from 'recoil';

function App() {
    axios.defaults.baseURL = baseUrl(httpProtocol);
    const pages = routes.map((route, int) => (
        <Route component={route.component} exact={route.exact} path={route.path} key={int} />
    ));
    const setUser = useSetRecoilState(userAtom);

    useEffect(() => {
        const session = localStorage.getItem('fableousRefreshToken');
        if (session != null) {
            setUser((previous) => {
                return { ...previous, isLoggedIn: true };
            });
        }
    });

    return (
        <BrowserRouter>
            <Switch>{pages}</Switch>
        </BrowserRouter>
    );
}

export default App;
