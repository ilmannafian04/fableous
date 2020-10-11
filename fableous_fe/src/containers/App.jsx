import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Story from './story/Story';
import HomePage from './HomePage/HomePage';
import CanvasDraw from './story/CanvasDraw';
import CanvasLayout from './CanvasLayout/CanvasLayout';

function App() {
    return (
        <Switch>
            <Route path="/story/:joinCode">
                <Story />
            </Route>
            <Route path="/story">
                <CanvasLayout />
            </Route>
            <Route path="/">
                <HomePage />
            </Route>
        </Switch>
    );
}

export default App;
