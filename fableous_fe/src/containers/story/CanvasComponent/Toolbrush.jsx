import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ColorBar from './ColorBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#7030A2',
        paddingTop: '1rem',
        paddingLeft: '1rem',
        paddingBottom: '1rem',
        paddingRight: '1rem',
    },
    position: {
        marginTop: '25rem',
        marginLeft: '28%',
    },
}));

export default function Toolbrush(props) {
    const classes = useStyles();

    return (
        <div className={classes.position}>
            <div className={classes.root}>
                <CloseIcon button onClick={() => props.closeDrawer(false)} />
                <ColorBar />
                <button
                    onClick={() => {
                        props.brushSize(5);
                    }}
                >
                    Small
                </button>
                <button
                    onClick={() => {
                        props.brushSize(15);
                    }}
                >
                    Medium
                </button>
                <button
                    onClick={() => {
                        props.brushSize(30);
                    }}
                >
                    Large
                </button>
            </div>
        </div>
    );
}
