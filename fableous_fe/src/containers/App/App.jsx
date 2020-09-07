import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Story from '../CanvasDraw/Story';
import HomePage from '../HomePage/HomePage';

function App() {
    return (
        <Switch>
            <Route path="/story/:joinCode">
                <Story />
            </Route>
            <Route path="/story">
                <Story />
            </Route>
            <Route path="/">
                <HomePage />
            </Route>
        </Switch>
    );
}

export default App;
