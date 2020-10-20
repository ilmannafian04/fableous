import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text, Image } from 'react-konva';

import useWindowSize from '../../../utils/hooks/useWindowSize';
import { calculateHeightBasedOnRatio } from '../../../helper/CanvasHelperFunctions/calculateHeightBasedOnRatio';
import { DEFAULT_HEIGHT_CANVAS, DEFAULT_WIDTH_CANVAS } from '../../../constant/ScreenRatio';
import { normalizePoint } from '../../../helper/CanvasHelperFunctions/normalizePoint';

function CanvasHub({ socket }) {
    // Window Size
    const { width, height } = useWindowSize();

    // Canvas State
    const [canvas] = useState(document.createElement('canvas'));
    const [canvasCharacter] = useState(document.createElement('canvas'));
    const [canvasIsReady, setCanvasIsReady] = useState(false);
    const [context, setContext] = useState(null);
    const [contextCharacter, setContextCharacter] = useState(null);

    // Dynamic Sizing States
    const [availSpace, setAvailSpace] = useState({ width: 0, height: 0 });

    // Dynamic Sizing States
    const [textNodes, setTextNodes] = useState([]);

    // Context States
    const [scale, setScale] = useState(1);
    const imageBackgroundRef = useRef();
    const imageCharacterRef = useRef();
    const backgroundLayerRef = useRef();
    const characterLayerRef = useRef();
    const textLayerRef = useRef();
    const stageRef = useRef();
    const headerRef = useRef();

    useEffect(() => {
        Konva.pixelRatio = 1;

        if (!canvasIsReady) {
            if (imageCharacterRef && imageBackgroundRef) {
                const context = canvas.getContext('2d');
                const contextCharacter = canvasCharacter.getContext('2d');
                canvas.width = DEFAULT_WIDTH_CANVAS;
                canvas.height = DEFAULT_HEIGHT_CANVAS;
                canvasCharacter.width = DEFAULT_WIDTH_CANVAS;
                canvasCharacter.height = DEFAULT_HEIGHT_CANVAS;
                setContext(context);
                setContextCharacter(contextCharacter);
                setCanvasIsReady(true);
            }
        }

        if (stageRef) {
            stageRef.current.batchDraw();

            // backgroundLayerRef.current.style.zIndex=1;
            // characterLayerRef.current.style.zIndex=2;
        }
    }, [canvasIsReady, canvas, canvasCharacter]);

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

    useEffect(() => {
        const hubHandler = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message['type']) {
                case 'newStroke':
                    message['data']['strokes'].forEach((drawing) =>
                        draw(
                            message['data']['layer'],
                            drawing.start,
                            drawing.stop,
                            drawing.size,
                            drawing.color,
                            drawing.mode
                        )
                    );
                    break;
                case 'text':
                    processText(message['data']);
                    break;
                default:
            }
        };
        if (socket) {
            socket.addEventListener('message', hubHandler);
        }
        return () => {
            socket.removeEventListener('message', hubHandler);
        };
    });

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

    const draw = (layer, prevPointer, nextPointer, size, color, mode) => {
        if (context && contextCharacter) {
            let image;
            let localPos;
            if (layer === 1) {
                image = imageBackgroundRef.current;
                context.lineJoin = 'round';
                context.lineCap = 'round';

                if (mode === 'brush') {
                    context.globalCompositeOperation = 'source-over';
                }
                if (mode === 'eraser') {
                    context.globalCompositeOperation = 'destination-out';
                }

                context.beginPath();
                context.lineWidth = size;
                context.strokeStyle = color;
                localPos = normalizePoint(prevPointer, scale, image);
                context.moveTo(localPos.x, localPos.y);
                localPos = normalizePoint(nextPointer, scale, image);
                context.lineTo(localPos.x, localPos.y);
                context.closePath();
                context.stroke();
            } else if (layer === 2) {
                image = imageCharacterRef.current;
                contextCharacter.lineJoin = 'round';
                contextCharacter.lineCap = 'round';

                if (mode === 'brush') {
                    contextCharacter.globalCompositeOperation = 'source-over';
                }
                if (mode === 'eraser') {
                    contextCharacter.globalCompositeOperation = 'destination-out';
                }
                contextCharacter.beginPath();
                contextCharacter.lineWidth = size;
                contextCharacter.strokeStyle = color;
                localPos = normalizePoint(prevPointer, scale, image);
                contextCharacter.moveTo(localPos.x, localPos.y);
                localPos = normalizePoint(nextPointer, scale, image);
                contextCharacter.lineTo(localPos.x, localPos.y);
                contextCharacter.closePath();
                contextCharacter.stroke();
            }

            stageRef.current.batchDraw();
        }
    };

    const downloadURI = (uri, name) => {
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const saveAsImage = () => {
        console.log('SAVE');
        const dataurl = stageRef.current.toDataURL({
            pixelRatio: 2,
        });
        downloadURI(dataurl, 'test.png');
    };
    return (
        <div ref={headerRef} style={{ width: '100%', height: '100%', background: 'orange' }}>
            <button onClick={() => saveAsImage()}>SAVE IMAGE</button>
            <Stage width={availSpace.width} height={availSpace.height} ref={stageRef}>
                <Layer ref={backgroundLayerRef}>
                    <Image
                        image={canvas}
                        width={availSpace.width}
                        height={availSpace.height}
                        ref={imageBackgroundRef}
                    />
                </Layer>
                <Layer ref={characterLayerRef}>
                    <Image
                        image={canvasCharacter}
                        width={availSpace.width}
                        height={availSpace.height}
                        ref={imageCharacterRef}
                    />
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
