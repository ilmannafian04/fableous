import React from 'react';
import './App.css';
import CanvasDraw from '../CanvasDraw';
import CanvasText3 from "../CanvasText3/CanvasText3";
import AudioRecorder from '../VoiceRecorder';
import AutoTextArea from '../CanvasText2/CanvasText2';

function App() {
    return (
        <div className="App" style={{overflow:'hidden',position:'relative'}}>
                <CanvasText3/>
        </div>
    );
}

export default App;
