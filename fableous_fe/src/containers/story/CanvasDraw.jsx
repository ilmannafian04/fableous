import produce from 'immer';
import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';

import useWindowSize from '../../utils/hooks/useWindowSize';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import CanvasLayout from '../CanvasLayout/CanvasLayout';
import { secondsToMMSS } from '../../utils/formatting';
import { Image, Layer, Stage } from 'react-konva';
import Heartbeat from 'react-heartbeat';

const DEFAULT_WIDTH_CANVAS = 1280;
const DEFAULT_HEIGHT_CANVAS = 720;
const WIDTH_RATIO = 16;
const HEIGHT_RATIO = 9;

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

    // CanvasLayout State
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

    const [messages, setMessages] = useState([]);
    const [drawState, setDrawState] = useState({ timeLeft: 3 * 60, currentPage: 1, pageCount: 0 });

    useEffect(() => {
        if (headerRef.current) {
            const calculateScale = () => {
                let parentWidth = headerRef.current.offsetWidth;
                const numerator = parentWidth > DEFAULT_WIDTH_CANVAS ? parentWidth : DEFAULT_WIDTH_CANVAS;
                const denominator = parentWidth > DEFAULT_WIDTH_CANVAS ? DEFAULT_WIDTH_CANVAS : parentWidth;
                const totalScale = numerator / denominator;
                const availableSpaceBasedOnRatio = calculateHeightBasedOnRatio(parentWidth);
                setScale(totalScale);
                setAvailSpace(availableSpaceBasedOnRatio);
            };

            calculateScale();
        }
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

    const calculateHeightBasedOnRatio = (width) => {
        return { width: width, height: (width / WIDTH_RATIO) * HEIGHT_RATIO };
    };

    const onPressDownHandler = () => {
        const currentPosition = imageRef.current.getStage().getPointerPosition();
        setIsPainting(true);

        // Temporary value
        context.lineWidth = brushSize;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        setLastPointerPosition(currentPosition);
    };

    const normalizePoint = (mousePosition, scale) => {
        if (headerRef.current.offsetWidth < DEFAULT_WIDTH_CANVAS) {
            return {
                x: mousePosition.x * scale,
                y: mousePosition.y * scale,
            };
        } else {
            return {
                x: mousePosition.x / scale,
                y: mousePosition.y / scale,
            };
        }
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

            localPos = normalizePoint(prevPointer, scale);

            context.moveTo(localPos.x, localPos.y);

            localPos = normalizePoint(nextPointer, scale);

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

    return (
        <div ref={headerRef} style={{ width: '100%', height: '100%' }}>
            <CanvasLayout />
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

            <Heartbeat
                heartbeatInterval={200}
                heartbeatFunction={() => {
                    if (socket && messages.length > 0) {
                        console.log(messages);
                        socket.send(JSON.stringify({ command: 'draw.story.stroke', data: messages }));
                        setMessages([]);
                    }
                }}
            />
        </div>
    );
}

export default CanvasDraw;
