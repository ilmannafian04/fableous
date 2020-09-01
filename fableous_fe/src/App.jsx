import React from 'react';
import { Button } from '@material-ui/core';
import './App.css';
import AudioRecorder from './Components/VoiceRecorder';
import MenuAppBar from './Components/MenuAppBar';
import PageBar from './Components/PageBar';

function App() {
    return (
        <div className="App">
            <div>
                <MenuAppBar />
            </div>
            <div>
                <PageBar />
            </div>
        </div>
    );
}

export default App;
