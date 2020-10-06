import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Story from './story/Story';
import HomePage from './HomePage/HomePage';
import CanvasText from './CanvasText/CanvasText';

function App() {
    return (
        <Switch>
            <Route path="/text">
                <CanvasText />
            </Route>
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
