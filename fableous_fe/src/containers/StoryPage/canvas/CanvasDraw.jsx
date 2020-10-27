import { createStyles, makeStyles } from '@material-ui/core/styles';
import produce from 'immer';
import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import Heartbeat from 'react-heartbeat';
import { Image, Layer, Stage } from 'react-konva';

import { DEFAULT_HEIGHT_CANVAS, DEFAULT_WIDTH_CANVAS } from '../../../constant/ScreenRatio';
import { calculateHeightBasedOnRatio } from '../../../helper/CanvasHelperFunctions/calculateHeightBasedOnRatio';
import { calculateScale } from '../../../helper/CanvasHelperFunctions/calculateScale';
import { normalizePoint } from '../../../helper/CanvasHelperFunctions/normalizePoint';
import useWindowSize from '../../../utils/hooks/useWindowSize';
import SideBar from './CanvasComponent/SideBar';

const useStyles = makeStyles(() =>
    createStyles({
        canvasStyle: {
            background: 'purple',
        },
    })
);

const CanvasDraw = ({ socket }) => {
    const classes = useStyles();
    // Window Size
    const { width, height } = useWindowSize();

    // CanvasLayout State
    const [canvas] = useState(document.createElement('canvas'));
    const [canvasIsReady, setCanvasIsReady] = useState(false);
    const [context, setContext] = useState(null);

    // Dynamic Sizing States
    const [lastPointerPosition, setLastPointerPosition] = useState(null);
    const [availSpace, setAvailSpace] = useState({ width: 0, height: 0 });

    // Context States
    const [isPainting, setIsPainting] = useState(false);
    const [scale, setScale] = useState(1);

    const imageRef = useRef();
    const stageRef = useRef();
    const headerRef = useRef();

    const [messages, setMessages] = useState([]);

    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(20);
    const [mode, setMode] = React.useState('brush');

    useEffect(() => {
        if (headerRef.current) {
            const totalScale = calculateScale(headerRef.current);
            const availableSpaceBasedOnRatio = calculateHeightBasedOnRatio(headerRef.current);
            setScale(totalScale);
            setAvailSpace(availableSpaceBasedOnRatio);
        }
        stageRef.current.batchDraw();
    }, [width, height, scale]);

    useEffect(() => {
        Konva.pixelRatio = 1;

        if (!canvasIsReady) {
            if (imageRef.current) {
                const context = canvas.getContext('2d');
                canvas.width = DEFAULT_WIDTH_CANVAS;
                canvas.height = DEFAULT_HEIGHT_CANVAS;
                setContext(context);
                setCanvasIsReady(true);
            }
        }

        if (stageRef) {
            stageRef.current.batchDraw();
        }
    }, [canvasIsReady, canvas]);

    // useEffect(() => {
    //     // const socket = new WebSocket('ws://127.0.0.1:8000/ws/drawing/lol/');
    //     // socket.onopen = () => {
    //     //     setSocketIsOpen(true);
    //     // };
    //     // socket.onclose = () => setSocketIsOpen(false);
    //     // socket.onerror = () => setSocketIsOpen(false);
    //     // setSocket(socket);
    //     // return () => socket.close();
    // }, []);

    const onPressDownHandler = () => {
        const currentPosition = imageRef.current.getStage().getPointerPosition();
        setIsPainting(true);

        context.lineWidth = brushSize;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        setLastPointerPosition(currentPosition);
    };

    const draw = (prevPointer, nextPointer) => {
        if (context) {
            const image = imageRef.current;
            let localPos;

            if (mode === 'brush') {
                context.globalCompositeOperation = 'source-over';
            }
            if (mode === 'eraser') {
                context.globalCompositeOperation = 'destination-out';
            }

            context.beginPath();
            context.strokeStyle = color;

            localPos = normalizePoint(prevPointer, scale, headerRef.current);

            context.moveTo(localPos.x, localPos.y);

            localPos = normalizePoint(nextPointer, scale, headerRef.current);

            context.lineTo(localPos.x, localPos.y);
            context.closePath();
            context.stroke();

            image.getLayer().batchDraw();
        }
    };

    const onMoveHandler = () => {
        if (isPainting) {
            const image = imageRef.current;
            const { x, y } = image.getStage().getPointerPosition();
            draw(lastPointerPosition, { x: x, y: y });
            setLastPointerPosition({ x: x, y: y });
            setMessages(
                produce(messages, (draft) => {
                    draft.push({
                        start: lastPointerPosition,
                        stop: { x: x, y: y },
                        color: color,
                        size: brushSize,
                        mode: mode,
                    });
                })
            );
        }
    };

    const endDrawing = () => {
        if (isPainting) {
            setIsPainting(false);
        }
    };

    return (
        <React.Fragment>
            <SideBar
                brushSize={setBrushSize}
                erase={{ mode: mode, setMode: setMode }}
                brushColor={{ color: color, setColor: setColor }}
            />
            <div
                ref={headerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stage
                    width={availSpace.width}
                    height={availSpace.height}
                    ref={stageRef}
                    className={classes.canvasStyle}
                >
                    <Layer>
                        <Image
                            image={canvas}
                            width={availSpace.width}
                            height={availSpace.height}
                            ref={imageRef}
                            stroke={'black'}
                            onMouseDown={onPressDownHandler}
                            onMouseMove={onMoveHandler}
                            onTouchStart={() => {
                                onPressDownHandler();
                                setIsPainting(true);
                            }}
                            onTouchMove={onMoveHandler}
                            onTouchEnd={endDrawing}
                            onMouseUp={endDrawing}
                            onMouseLeave={endDrawing}
                            listening={true}
                        />
                    </Layer>
                </Stage>

                <Heartbeat
                    heartbeatInterval={200}
                    heartbeatFunction={() => {
                        if (socket && messages.length > 0) {
                            socket.send(JSON.stringify({ command: 'draw.story.stroke', data: messages }));
                            setMessages([]);
                        }
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default CanvasDraw;
