import React from 'react';

import './App.css';
import DrawingSession from '../CanvasDraw/DrawingSession';
import AudioRecorder from '../VoiceRecorder';

function App() {
    return (
        <div>
            <DrawingSession />
            <div className={'Audio-recorder'}>
                <AudioRecorder />
            </div>
        </div>
    );
}

export default App;
