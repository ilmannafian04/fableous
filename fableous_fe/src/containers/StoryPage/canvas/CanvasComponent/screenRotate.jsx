import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { secondsToMMSS } from '../../../../utils/formatting';
import { useRecoilValue } from 'recoil';
import storyAtom from '../../../../atom/storyAtom';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#2E3138',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '80%',
        backgroundColor: '#F6F1D3',
        borderRadius: '46px',
    },
    paperInside: {
        display: 'flex',
        width: '97%',
        height: '97%',
        backgroundColor: '#7030A2',
        margin: 'inherit',
        borderRadius: '46px',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    rotate: {
        color: '#F6F1D3',
        fontWeight: 700,
        align: 'center',
    },
    title: {
        color: '#F6F1D3',
        fontWeight: 700,
    },
    divider: {
        borderRadius: '5px',
        borderTop: '2px solid #bbb',
        width: '50%',
    },
    timer: {
        display: 'flex',
        width: '10rem',
        height: '5rem',
        backgroundColor: '#7030A2',
        color: '#F6F1D3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
    },
    timerBox: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginRight: '3rem',
        marginTop: '2rem',
    },
}));

function ScreenRotate() {
    const storyState = useRecoilValue(storyAtom);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.paper}>
                <div className={classes.paperInside}>
                    <Typography variant={'h2'} className={classes.title}>
                        Fableous
                    </Typography>
                    <hr className={classes.divider} />
                    <Typography variant={'h5'} className={classes.rotate}>
                        Rotate your screen to use the canvas
                    </Typography>
                    <div className={classes.timerBox}>
                        <div className={classes.timer}>
                            <h1>{secondsToMMSS(storyState.timeLeft)}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScreenRotate;
