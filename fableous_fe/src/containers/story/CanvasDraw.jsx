import produce from 'immer';
import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import Heartbeat from 'react-heartbeat';
import { Image, Layer, Stage } from 'react-konva';

import useWindowSize from '../../utils/hooks/useWindowSize';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CirclePicker } from 'react-color';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { secondsToMMSS } from '../../utils/formatting';

import {calculateScale} from "../../helper/CanvasHelperFunctions/calculateScale";
import {calculateHeightBasedOnRatio} from "../../helper/CanvasHelperFunctions/calculateHeightBasedOnRatio";
import {DEFAULT_HEIGHT_CANVAS, DEFAULT_WIDTH_CANVAS} from "../../constants/ScreenRatio";
import {normalizePoint} from "../../helper/CanvasHelperFunctions/normalizePoint";



const useStyles = makeStyles(() =>
    createStyles({
        canvasStyle: {
            background: 'purple',
        },
    })
);

function CanvasDraw({ socket }) {
    const classes = useStyles();
    // Window Size
    const { width, height } = useWindowSize();

    // Canvas State
    const [canvas] = useState(document.createElement('canvas'));
    const [canvasIsReady, setCanvasIsReady] = useState(false);
    const [context, setContext] = useState(null);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(20);
    const [mode, setMode] = React.useState('brush');

    // Dynamic Sizing States
    const [lastPointerPosition, setLastPointerPosition] = useState(null);
    const [availSpace, setAvailSpace] = useState({ width: 0, height: 0 });

    // Context States
    const [isPainting, setIsPainting] = useState(false);
    const [scale, setScale] = useState(1);

    const imageRef = useRef();
    const stageRef = useRef();
    const headerRef = useRef();

    const [socket, setSocket] = useState(null);
    const [socketIsOpen, setSocketIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [drawState, setDrawState] = useState({ timeLeft: 3 * 60, currentPage: 1, pageCount: 0 });

    useEffect(() => {
        if (headerRef.current) {
            const totalScale = calculateScale(headerRef.current)
            const availableSpaceBasedOnRatio = calculateHeightBasedOnRatio(headerRef.current);
            setScale(totalScale)
            setAvailSpace(availableSpaceBasedOnRatio)
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

    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/drawing/lol/');
        socket.onopen = () => {
            setSocketIsOpen(true);
        };
        socket.onclose = () => setSocketIsOpen(false);
        socket.onerror = () => setSocketIsOpen(false);
        setSocket(socket);
        return () => socket.close();
    }, []);

    if (socket) {
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message['type']) {
                case 'draw':
                    message['data']['strokes'].forEach((drawing) => draw(drawing.start, drawing.stop));
                    break;
                case 'state':
                    setDrawState(message['data']);
                    break;
                default:
                    console.error('Unknown WS message');
            }
        };
    }


    const onPressDownHandler = () => {
        const currentPosition = imageRef.current.getStage().getPointerPosition();
        setIsPainting(true);

        // Temporary value
        context.lineWidth = 20;
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

            localPos = normalizePoint(nextPointer, scale,headerRef.current);

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
                        strokeStyle: color,
                        size: brushSize,
                        globalCompositeOperation: mode,
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

    const modeHandler = (event) => {
        setMode(event.target.value);
    };

    return (
        <div ref={headerRef} style={{ width: '100%', height: '100%' }}>
            <h1>Draw</h1>
            <CirclePicker
                color={color}
                onChangeComplete={(color) => {
                    setColor(color.hex);
                }}
            />
            <button
                onClick={() => {
                    setBrushSize(5);
                }}
            >
                Small
            </button>
            <button
                onClick={() => {
                    setBrushSize(15);
                }}
            >
                Medium
            </button>
            <button
                onClick={() => {
                    setBrushSize(30);
                }}
            >
                Large
            </button>

            <RadioGroup aria-label="tool" name="tool" value={mode} onChange={modeHandler}>
                <Radio onChange={modeHandler} value="brush" label="Brush" />
                <Radio onChange={modeHandler} value="eraser" label="Eraser" />
            </RadioGroup>
            <span>
                Page {drawState.currentPage} out of {drawState.pageCount}
            </span>
            <br />
            <span>
                <b>Time left:</b> {secondsToMMSS(drawState.timeLeft)}
            </span>
            <Stage width={availSpace.width} height={availSpace.height} ref={stageRef} className={classes.canvasStyle}>
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
            <span>
                Some notes: combined story only appears on the hub, this is to encourage interaction between team
                members, according to proposal
            </span>
            <Heartbeat
                heartbeatInterval={200}
                heartbeatFunction={() => {
                    if (socketIsOpen && messages.length > 0) {
                        socket.send(JSON.stringify(messages));
                        setMessages([]);
                    }
                }}
            />
        </div>
    );
}

export default CanvasDraw;
