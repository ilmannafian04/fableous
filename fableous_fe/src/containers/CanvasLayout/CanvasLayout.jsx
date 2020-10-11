import React, { useState } from 'react';

import SideBar from '../story/CanvasComponent/SideBar';
import PageBar from '../story/CanvasComponent/PageBar';
import MenuAppBar from '../story/CanvasComponent/MenuAppBar';
import { secondsToMMSS } from '../../utils/formatting';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CanvasDraw from '../story/CanvasDraw';

const useStyles = makeStyles((theme) => ({
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

const CanvasLayout = () => {
    const [drawState, setDrawState] = useState({ timeLeft: 3 * 60, currentPage: 1, pageCount: 0 });
    const classes = useStyles();
    return (
        <div>
            <SideBar />
            <PageBar page={drawState.pageCount} />
            <MenuAppBar />
            <div className={classes.timerBox}>
                <div className={classes.timer}>
                    <h1>{secondsToMMSS(drawState.timeLeft)}</h1>
                </div>
            </div>
        </div>
    );
};

export default CanvasLayout;
