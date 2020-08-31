import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import AudioRecorder from './VoiceRecorder';

function App() {
    return (
        <div className="App">
            <div className={'Audio-recorder'}>
                <AudioRecorder />
            </div>
        </div>
    );
}

export default App;
