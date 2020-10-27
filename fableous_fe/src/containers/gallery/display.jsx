import React from 'react';
import Navbar from './GalleryComponent/Navbar';
import BottomBar from './GalleryComponent/BottomBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: '#7030A2',
        width: '100vw',
        height: '100vh',
    },
    content: {
        height: '200vh',
        backgroundColor: 'white',
    },
}));

const Display = () => {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <Navbar />

            <BottomBar />
        </div>
    );
};

export default Display;
