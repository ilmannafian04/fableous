import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Image } from 'react-konva';

import useWindowSize from '../../utils/hooks/useWindowSize';

const DEFAULT_WIDTH_CANVAS = 1280;
const DEFAULT_HEIGHT_CANVAS = 720;
const WIDTH_RATIO = 16;
const HEIGHT_RATIO = 9;

function CanvasDraw() {
    // Window Size
    const { width, height } = useWindowSize();

    // Canvas State
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

    const [socket, setSocket] = useState(null);
    // const [socketIsOpen, setSocketIsOpen] = useState(false);

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

    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/drawing/lol/');
        socket.onopen = () => {
            setSocketIsOpen(true);
        };
        socket.onclose = () => setSocketIsOpen(false);
        socket.onerror = () => setSocketIsOpen(false);
        setSocket(socket);
    }, []);

    if (socket) {
        socket.onmessage = (ev) => {
            const message = JSON.parse(ev.data);
            draw(message.start, message.stop);
        };
    }

    const calculateHeightBasedOnRatio = (width) => {
        return { width: width, height: (width / WIDTH_RATIO) * HEIGHT_RATIO };
    };

    const onPressDownHandler = () => {
        const currentPosition = imageRef.current.getStage().getPointerPosition();
        setIsPainting(true);

        // Temporary value
        context.lineWidth = 20;
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
            context.beginPath();

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
            if (socket) {
                socket.send(JSON.stringify({ start: lastPointerPosition, stop: { x: x, y: y }, color: '', size: 10 }));
            }
        }
    };

    const endDrawing = () => {
        setIsPainting(false);
    };

    return (
        <div ref={headerRef} style={{ width: '100%', height: '100%' }}>
            <Stage width={availSpace.width} height={availSpace.height} ref={stageRef}>
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
        </div>
    );
}

export default CanvasDraw;
