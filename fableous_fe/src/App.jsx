import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import AudioRecorder from './VoiceRecorder';
import { routes } from './routes';

function App() {
    const pages = routes.map((route, int) => (
        <Route component={route.component} exact={route.exact} path={route.path} key={int} />
    ));

    return (
        <div className="App">
            {/*<div className={'Audio-recorder'}>*/}
            {/*    <AudioRecorder/>*/}
            {/*</div>*/}
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>{pages}</Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
