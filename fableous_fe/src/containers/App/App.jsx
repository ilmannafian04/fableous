import React from 'react';
import './App.css';
import CanvasDraw from '../CanvasDraw';
import CanvasText from "../CanvasText/CanvasText";
import AudioRecorder from '../VoiceRecorder';

function App() {
    return (
        <div className="App">
            <div className="container">
                <CanvasText />
                {/*<div className={'Audio-recorder'}>*/}
                {/*    <AudioRecorder />*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default App;
