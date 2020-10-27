import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import './App.css';
import { routes } from './routes';
import userAtom from '../../atom/userAtom';

const App = () => {
    const pages = routes.map((route, index) => (
        <Route component={route.component} exact={route.exact} path={route.path} key={index} />
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
};

export default App;
