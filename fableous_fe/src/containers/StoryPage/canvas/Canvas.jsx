import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect, useState } from 'react';

import MenuAppBar from './CanvasComponent/MenuAppBar';
import PageBar from './CanvasComponent/PageBar';
import SideBar from './CanvasComponent/SideBar';
import CanvasDraw from './CanvasDraw';
import CanvasHub from './CanvasHub';
import CanvasText from './CanvasText';
import useWindowSize from '../../../utils/hooks/useWindowSize';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    canvasWrapper: {
        display: 'flex',
        zIndex: 1,
        position: 'sticky',
    },
}));

const Canvas = ({ socket, role }) => {
    const [drawState, setDrawState] = useState({ timeLeft: 3 * 60, currentPage: 1, pageCount: 0 });
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(20);
    const [mode, setMode] = React.useState('brush');
    const { width, height } = useWindowSize();
    const classes = useStyles();

    useEffect(() => {
        const drawStateHandler = (event) => {
            const message = JSON.parse(event.data);
            if (message['type'] === 'drawState') {
                setDrawState(message['data']);
            }
        };
        socket.addEventListener('message', drawStateHandler);
        return () => {
            socket.removeEventListener('message', drawStateHandler);
        };
    }, [socket]);

    useEffect(() => {
        const checkOrientation = () => {};
    });

    let displayedCanvas;
    switch (role) {
        case 1:
        case 2:
            displayedCanvas = (
                <CanvasDraw
                    changeDrawState={setDrawState}
                    brushColor={color}
                    mode={mode}
                    brushSize={brushSize}
                    socket={socket}
                />
            );
            break;
        case 3:
            displayedCanvas = <CanvasText socket={socket} />;
            break;
        case 4:
            displayedCanvas = <CanvasHub socket={socket} />;
            break;
        default:
            displayedCanvas = <h1>Uh oh</h1>;
            break;
    }
    if (window.innerHeight < window.innerWidth) {
        return (
            <div className={classes.root}>
                <div className={classes.canvasWrapper}>
                    <SideBar
                        brushSize={setBrushSize}
                        erase={{ mode: mode, setMode: setMode }}
                        brushColor={{ color: color, setColor: setColor }}
                    />
                </div>
                {displayedCanvas}
                <PageBar page={drawState.pageCount} />
                <MenuAppBar />
                {/*<div className={classes.timerBox}>*/}
                {/*    <div className={classes.timer}>*/}
                {/*        <h1>{secondsToMMSS(drawState.timeLeft)}</h1>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <h1> portrait</h1>
            </div>
        );
    }
};

export default Canvas;
