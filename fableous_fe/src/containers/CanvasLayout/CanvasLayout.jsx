import React, { useRef, useState } from 'react';

import SideBar from '../story/CanvasComponent/SideBar';
import PageBar from '../story/CanvasComponent/PageBar';
import MenuAppBar from '../story/CanvasComponent/MenuAppBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CanvasDraw from '../story/CanvasDraw';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
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
    // canvasWrapper: {
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     width: '100vw',
    //     height: '100vh'
    // }
}));

const CanvasLayout = () => {
    const [drawState, setDrawState] = useState({ timeLeft: 3 * 60, currentPage: 1, pageCount: 0 });
    const classes = useStyles();
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(20);
    const [mode, setMode] = React.useState('brush');

    const canvasWrapperRef = useRef();
    // const [canvasSize, setCanvasSize] = useState({width: 0, height: 0})

    // useEffect(() => {
    //     if (canvasWrapperRef) {
    //         widthMaintainer()
    //     }
    // }, [])

    // const widthMaintainer = () => {
    //     console.log(ref)
    //     const width = canvasWrapperRef.current.getBoundingClientRect().width
    //     const result = Math.floor(width / 16)
    //     setCanvasSize({width: 16 * result, height: 9 * result})
    //     console.log(canvasSize)
    // }

    return (
        <div className={classes.root}>
            <SideBar
                brushSize={setBrushSize}
                erase={{ mode: mode, setMode: setMode }}
                brushColor={{ color: color, setColor: setColor }}
            />
            <PageBar page={drawState.pageCount} />
            <MenuAppBar />
            {/*<div className={classes.timerBox}>*/}
            {/*    <div className={classes.timer}>*/}
            {/*        <h1>{secondsToMMSS(drawState.timeLeft)}</h1>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <CanvasDraw brushColor={color} mode={mode} brushSize={brushSize} />
        </div>
    );
};

export default CanvasLayout;
