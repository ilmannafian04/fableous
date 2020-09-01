import React from 'react';
import { Button } from '@material-ui/core';
import './App.css';
import AudioRecorder from './Components/VoiceRecorder';
import MenuAppBar from './Components/MenuAppBar';
import PageBar from './Components/PageBar';
import SideBar from './Components/SideBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app: {},
}));

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <div>
                <SideBar />
            </div>
            <div>
                <MenuAppBar />
            </div>
            <div>
                <PageBar />
            </div>
        </div>
    );
}
