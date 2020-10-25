import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import { routes } from './routes';

const App = () => {
    const pages = routes.map((route, index) => (
        <Route component={route.component} exact={route.exact} path={route.path} key={index} />
    ));
    return (
        <BrowserRouter>
            <Switch>{pages}</Switch>
        </BrowserRouter>
    );
};

export default App;
