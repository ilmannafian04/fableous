import React from 'react';
import './App.css';
import CanvasDraw from '../CanvasDraw';
import CanvasText from "../CanvasText/CanvasText";
import AudioRecorder from '../VoiceRecorder';
import AutoTextArea from '../CanvasText2/CanvasText2';
import { Route, Switch } from 'react-router-dom';
import Story from '../story/Story';
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
            <Route path="text">
                <CanvasText />
            </Route>
        </Switch>
    );
}

export default App;
