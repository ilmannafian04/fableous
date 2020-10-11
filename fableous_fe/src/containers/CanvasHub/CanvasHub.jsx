import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text, Image } from 'react-konva';

import useWindowSize from '../../utils/hooks/useWindowSize';
import { calculateHeightBasedOnRatio } from '../../helper/CanvasHelperFunctions/calculateHeightBasedOnRatio';
import { DEFAULT_HEIGHT_CANVAS, DEFAULT_WIDTH_CANVAS } from '../../constants/ScreenRatio';
import { normalizePoint } from '../../helper/CanvasHelperFunctions/normalizePoint';

function CanvasHub({ socket }) {
    // Window Size
    const { width, height } = useWindowSize();

    // Canvas State
    const [canvas] = useState(document.createElement('canvas'));
    const [canvasIsReady, setCanvasIsReady] = useState(false);
    const [context, setContext] = useState(null);

    // Dynamic Sizing States
    const [availSpace, setAvailSpace] = useState({ width: 0, height: 0 });

    // Dynamic Sizing States
    const [textNodes, setTextNodes] = useState([]);

    // Context States
    const [scale, setScale] = useState(1);
    const imageDrawRef = useRef();
    const textLayerRef = useRef();
    const stageRef = useRef();
    const headerRef = useRef();

    useEffect(() => {
        Konva.pixelRatio = 1;

        if (!canvasIsReady) {
            if (imageDrawRef.current) {
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
    }, [canvasIsReady, canvas, imageDrawRef]);

    useEffect(() => {
        if (headerRef.current) {
            const totalScale = headerRef.current.offsetWidth / DEFAULT_WIDTH_CANVAS;
            const availableSpaceBasedOnRatio = calculateHeightBasedOnRatio(headerRef.current);
            setScale(totalScale);
            setAvailSpace(availableSpaceBasedOnRatio);
        }
        stageRef.current.batchDraw();
    }, [width, height, scale]);

    useEffect(() => {
        stageRef.current.batchDraw();
    }, [textNodes]);

    useEffect(() => {
        if (headerRef.current) {
            const totalScale = headerRef.current.offsetWidth / DEFAULT_WIDTH_CANVAS;
            const availableSpaceBasedOnRatio = calculateHeightBasedOnRatio(headerRef.current);
            setScale(totalScale);
            setAvailSpace(availableSpaceBasedOnRatio);
        }
        stageRef.current.batchDraw();
    }, [width, height, scale]);

    if (socket) {
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message['type']) {
                case 'newStroke':
                    console.log(message);
                    message['data']['strokes'].forEach((drawing) => draw(drawing.start, drawing.stop, drawing.scale));
                    break;
                case 'text':
                    processText(message['data']);
                    break;
                default:
                    console.error('Unknown WS message');
            }
        };
    }

    const processText = (data) => {
        if (data['text_node']['action'] === 'create_text') {
            createTextNode(data['text_node']['text_id']);
        } else if (data['text_node']['action'] === 'update_text_position') {
            updateTextNodePosition(data['text_node']);
            console.log(data);
        } else if (data['text_node']['action'] === 'update_text_transform') {
            updateTextNodeTransform(data['text_node']);
            console.log(data);
        } else if (data['text_node']['action'] === 'update_text_attribute') {
            updateTextNodeAttributes(data['text_node']);
            console.log(data);
        } else if (data['text_node']['action'] === 'delete_text') {
        }
    };

    const createTextNode = (text_id) => {
        const textNode = {
            text_id: text_id,
            text: 'Type Here',
            x: 160,
            y: 90,
            fontSize: 40 * scale,
            draggable: true,
            width: 180,
            height: 40,
            default_x: 160,
            default_y: 90,
            default_fontSize: 40,
            default_width: 180,
            textScale: scale,
        };
        setTextNodes(textNodes.concat(textNode));
    };

    const updateTextNodePosition = (data) => {
        const position = textNodes.findIndex((node) => node.text_id === data['text_id']);
        let tempArr = [...textNodes];
        let textNode = { ...tempArr[position] };
        textNode.x = data['x'];
        textNode.y = data['y'];
        textNode.default_x = data['default_x'];
        textNode.default_y = data['default_y'];
        tempArr[position] = textNode;
        setTextNodes(tempArr);
    };

    const updateTextNodeTransform = (data) => {
        const position = textNodes.findIndex((node) => node.text_id === data['text_id']);
        let tempArr = [...textNodes];
        let textNode = { ...tempArr[position] };
        textNode.x = data['x'];
        textNode.y = data['y'];
        textNode.width = data['width'];
        textNode.height = data['height'];
        textNode.default_x = data['default_x'];
        textNode.default_y = data['default_y'];
        tempArr[position] = textNode;
        setTextNodes(tempArr);
    };

    const updateTextNodeAttributes = (data) => {
        const position = textNodes.findIndex((node) => node.text_id === data['text_id']);
        let tempArr = [...textNodes];
        let textNode = { ...tempArr[position] };
        textNode.text = data['text'];
        textNode.height = data['height'];
        tempArr[position] = textNode;
        setTextNodes(tempArr);
    };

    const draw = (prevPointer, nextPointer, drawScale) => {
        if (context) {
            const image = imageDrawRef.current;
            let localPos;
            context.globalCompositeOperation = 'source-over';
            context.beginPath();
            context.strokeStyle = 'black';
            localPos = normalizePoint(prevPointer, scale, imageDrawRef.current);
            context.moveTo(localPos.x, localPos.y);
            localPos = normalizePoint(nextPointer, scale, imageDrawRef.current);
            context.lineTo(localPos.x, localPos.y);
            context.closePath();
            context.stroke();
            image.getLayer().batchDraw();
        }
    };

    return (
        <div ref={headerRef} style={{ width: '100%', height: '100%', background: 'orange' }}>
            <Stage width={availSpace.width} height={availSpace.height} ref={stageRef}>
                <Layer>
                    <Image image={canvas} width={availSpace.width} height={availSpace.height} ref={imageDrawRef} />
                </Layer>
                <Layer ref={textLayerRef}>
                    {textNodes
                        ? textNodes.map((textAttr, i) => (
                              <Text
                                  key={i}
                                  id={textAttr.text_id}
                                  text={textAttr.text}
                                  x={textAttr.x}
                                  y={textAttr.y}
                                  fontSize={textAttr.fontSize}
                                  draggable={false}
                                  width={textAttr.width}
                                  keepRatio={true}
                                  padding={3}
                              />
                          ))
                        : null}
                </Layer>
            </Stage>
        </div>
    );
}

export default CanvasHub;
