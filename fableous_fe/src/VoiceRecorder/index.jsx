import React from 'react';
import { ReactMic } from 'react-mic';

export class AudioRecorder extends React.Component {
    blobUrl = '123';

    constructor(props) {
        super(props);
        this.state = {
            record: false,
        };
    }

    startRecording = () => {
        this.setState({ record: true });
    };

    stopRecording = () => {
        this.setState({ record: false });
    };

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
    }

    render() {
        return (
            <div>
                <ReactMic record={this.state.record} className="sound-wave" onStop={this.onStop} onData={this.onData} />
                <div>
                    <img
                        src="https://www.iconsdb.com/icons/preview/gray/volume-up-4-xxl.png"
                        id="img_voice"
                        width="50"
                        height="50"
                    />
                </div>
                <button onClick={this.startRecording} type="button">
                    Start
                </button>
                <button onClick={this.stopRecording} type="button">
                    Stop
                </button>
            </div>
        );
    }
}
export default AudioRecorder;
