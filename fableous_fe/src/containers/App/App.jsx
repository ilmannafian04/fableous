import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Story from '../CanvasDraw/Story';
import Landing from '../../Landing';

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
                <Landing />
            </Route>
        </Switch>
    );
}

export default App;
