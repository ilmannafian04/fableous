import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect, useState } from 'react';

import MenuAppBar from './CanvasComponent/MenuAppBar';
import PageBar from './CanvasComponent/PageBar';
import CanvasDraw from './CanvasDraw';
import CanvasHub from './CanvasHub';
import CanvasText from './CanvasText';
import useWindowSize from '../../../utils/hooks/useWindowSize';
import ScreenRotate from './CanvasComponent/screenRotate';
import { useRecoilState, useRecoilValue } from 'recoil';
import storyAtom from '../../../atom/storyAtom';
import socketAtom from '../../../atom/socketAtom';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
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
        position: 'absolute',
    },
    canvasCentered: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const Canvas = () => {
    const socket = useRecoilValue(socketAtom);
    const [storyState, setStoryState] = useRecoilState(storyAtom);
    const classes = useStyles();

    // Window Size
    const { width, height } = useWindowSize();
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        if (width < height) {
            setIsPortrait(true);
        } else {
            setIsPortrait(false);
        }
    }, [width, height]);

    useEffect(() => {
        const drawStateHandler = (event) => {
            const message = JSON.parse(event.data);
            if (message['type'] === 'drawState') {
                setStoryState((prev) => {
                    return { ...prev, ...message['data'] };
                });
            }
        };
        socket.addEventListener('message', drawStateHandler);
        return () => {
            socket.removeEventListener('message', drawStateHandler);
        };
    }, [socket, setStoryState]);

    let displayedCanvas;
    switch (storyState.self.role) {
        case 1:
        case 2:
            displayedCanvas = <CanvasDraw />;
            break;
        case 3:
            displayedCanvas = <CanvasText />;
            break;
        case 4:
            displayedCanvas = <CanvasHub />;
            break;
        default:
            displayedCanvas = <h1>Uh oh</h1>;
            break;
    }
    return (
        <div className={classes.root}>
            <div className={classes.canvasWrapper}>{isPortrait ? <ScreenRotate /> : null}</div>
            {displayedCanvas}
            <PageBar />
            <MenuAppBar />
        </div>
    );
};

export default Canvas;
