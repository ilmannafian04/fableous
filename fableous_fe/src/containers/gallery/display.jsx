import React from 'react';
import Navbar from './GalleryComponent/Navbar';
import BottomBar from './GalleryComponent/BottomBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: '#7030A2',
        height: '100vh',
        width: '100vw',
        overflowY: 'scroll',
    },
    content: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: '100%',
        width: '100%',
        objectFit: 'scale-down',
    },
    imgWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const Display = () => {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <Navbar />
            <div className={classes.content}>
                <img className={classes.img} src={require('./stock/test1.png')} alt="story" />
            </div>
            <BottomBar />
        </div>
    );
};

export default Display;
