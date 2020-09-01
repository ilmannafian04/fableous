import React from 'react';
import { Button } from '@material-ui/core';
import './App.css';
import AudioRecorder from './components/VoiceRecorder';
import MenuAppBar from './components/MenuAppBar';
import PageBar from './components/PageBar';
import SideBar from './components/SideBar';
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
