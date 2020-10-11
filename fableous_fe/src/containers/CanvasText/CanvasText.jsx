import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text } from 'react-konva';
import { v1 as uuid } from 'uuid';

import useWindowSize from '../../utils/hooks/useWindowSize';
import { calculateHeightBasedOnRatio } from '../../helper/CanvasHelperFunctions/calculateHeightBasedOnRatio';
import { DEFAULT_HEIGHT_CANVAS, DEFAULT_WIDTH_CANVAS } from '../../constants/ScreenRatio';
import TransformerComponent from '../../components/TransformerComponent/TransformerComponent';

import AutoTextAreaComponent from '../../components/AutoTextAreaComponent/AutoTextAreaComponent';

function CanvasText(props) {
    // Window Size
    const { width, height } = useWindowSize();

    // Canvas State
    const [canvas] = useState(document.createElement('canvas'));
    const [canvasIsReady, setCanvasIsReady] = useState(false);

    // Dynamic Sizing States
    const [availSpace, setAvailSpace] = useState({ width: 0, height: 0 });
    const [selectedShape, setSelectedShape] = useState(null);
    const [textAreaAttributes, setTextAreaAttributes] = useState({ x: 0, y: 0, textAreaWidth: 0, textAreaHeight: 0 });
    const [shapes, setShapes] = useState([]);
    const [isTransform, setIsTransform] = useState(false);

    // Context States
    const [scale, setScale] = useState(1);

    const imageRef = useRef();
    const stageRef = useRef();
    const layerRef = useRef();
    const headerRef = useRef();

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
        if (shapes) {
            let tempTextArray = [...shapes];
            tempTextArray.forEach((textNode) => {
                textNode.x = textNode.default_x * (scale / textNode.textScale);
                textNode.y = textNode.default_y * (scale / textNode.textScale);
                textNode.fontSize = textNode.default_fontSize * (scale / textNode.textScale);
                textNode.width = textNode.default_width * (scale / textNode.textScale);
            });

            setShapes(tempTextArray);
        }

        stageRef.current.batchDraw();
    }, [width, height, scale, shapes]);

    useEffect(() => {
        stageRef.current.draw();
    }, [textAreaAttributes]);

    useEffect(() => {
        Konva.pixelRatio = 1;

        if (!canvasIsReady) {
            if (imageRef.current) {
                canvas.width = DEFAULT_WIDTH_CANVAS;
                canvas.height = DEFAULT_HEIGHT_CANVAS;
                setCanvasIsReady(true);
            }
        }

        if (stageRef) {
            stageRef.current.batchDraw();
        }
    }, [canvasIsReady, canvas, layerRef]);

    useEffect(() => {
        if (selectedShape) {
            const selectedNode = stageRef.current.findOne('#' + selectedShape.text_id);
            selectedNode.show();
            setTextAreaAttributes({ x: 0, y: 0, textAreaWidth: 0, textAreaHeight: 0 });
            setSelectedShape(null);
        }
    }, [scale, selectedShape]);

    const drawText = () => {
        createTextNode();
    };

    const createTextNode = () => {
        const text_id = uuid();
        const textNode = {
            text_id: text_id,
            text: 'Type Here',
            x: 160,
            y: 90,
            fontSize: 40,
            draggable: true,
            width: 180,
            height: 40,
            default_x: 160,
            default_y: 90,
            default_fontSize: 40,
            default_width: 180,
            textScale: scale,
        };
        setShapes(shapes.concat(textNode));

        if (props.socket) {
            props.socket.send(
                JSON.stringify({
                    command: 'text.story.textNode',
                    data: {
                        action: 'create_text',
                        text_id: textNode.text_id,
                    },
                })
            );
        }
    };

    const outsideTextPress = () => {
        if (selectedShape) {
            const selectedNode = stageRef.current.findOne('#' + selectedShape.text_id);
            selectedNode.show();
        }
        if (props.socket && selectedShape) {
            const position = shapes.findIndex((node) => node.text_id === selectedShape.text_id);
            const textNode = shapes[position];
            props.socket.send(
                JSON.stringify({
                    command: 'text.story.textNode',
                    data: {
                        action: 'update_text_attribute',
                        text_id: textNode.text_id,
                        text: textNode.text,
                        height: textAreaAttributes.textAreaHeight,
                    },
                })
            );
        }
        setTextAreaAttributes({ x: 0, y: 0, textAreaWidth: 0, textAreaHeight: 0 });
        setSelectedShape(null);
    };

    const updateTextHeight = (text_id, height) => {
        let tempShapes = [...shapes];
        const position = tempShapes.findIndex((node) => node.text_id === text_id);
        let textNode = { ...tempShapes[position] };
        textNode.height = height;
        tempShapes[position] = textNode;
        setShapes(tempShapes);
        setTextAreaAttributes({
            x: textAreaAttributes.x,
            y: textAreaAttributes.y,
            textAreaWidth: textAreaAttributes.textAreaWidth,
            textAreaHeight: height,
        });
    };

    const updateTextValue = (text_id, text_value) => {
        let tempShapes = [...shapes];
        const position = tempShapes.findIndex((node) => node.text_id === text_id);
        let textNode = { ...tempShapes[position] };
        textNode.text = text_value;
        tempShapes[position] = textNode;
        setShapes(tempShapes);
    };

    return (
        <div
            ref={headerRef}
            style={{ width: '100%', height: '100%', overflow: 'hidden', background: 'yellow', display: 'inline-block' }}
        >
            <h1>{isTransform}</h1>
            <button onClick={drawText}> TEXT </button>
            <Stage
                width={availSpace.width}
                height={availSpace.height}
                ref={stageRef}
                onTap={() => outsideTextPress()}
                onClick={() => outsideTextPress()}
                stroke={'black'}
            >
                <Layer ref={layerRef}>
                    {shapes.map((textAttr, i) => (
                        <Text
                            key={i}
                            id={textAttr.text_id}
                            text={textAttr.text}
                            x={textAttr.x}
                            y={textAttr.y}
                            fontSize={textAttr.fontSize * scale}
                            draggable={true}
                            width={textAttr.width}
                            keepRatio={true}
                            padding={3}
                            dragBoundFunc={(pos) => {
                                let positionX = pos.x;
                                let positionY = pos.y;
                                const maxWidth = stageRef.current.width() - textAttr.width;
                                const maxHeight = stageRef.current.height();
                                let finalPosition;

                                if (pos.x < 0 || pos.x > maxWidth) {
                                    const closerDistance = Math.min(Math.abs(0 - pos.x), Math.abs(maxWidth - pos.x));
                                    if (closerDistance === Math.abs(pos.x)) {
                                        positionX = 0;
                                    } else {
                                        positionX = maxWidth;
                                    }
                                }

                                if (pos.y < 0 || pos.y > maxHeight) {
                                    const closerDistance = Math.min(Math.abs(0 - pos.y), Math.abs(maxHeight - pos.y));
                                    if (closerDistance === Math.abs(pos.y)) {
                                        positionY = 0;
                                    } else {
                                        positionY = maxHeight;
                                    }
                                    finalPosition = {
                                        x: positionX,
                                        y: positionY,
                                    };
                                } else {
                                    finalPosition = {
                                        x: positionX,
                                        y: positionY,
                                    };
                                }
                                return finalPosition;
                            }}
                            onDragEnd={(e) => {
                                console.log(e.target.x() + e.target.getClientRect(), e.target.y());
                                let tempShapes = [...shapes];
                                let textNode = { ...tempShapes[i] };
                                textNode.x = e.target.x();
                                textNode.y = e.target.y();
                                textNode.default_x = e.target.x();
                                textNode.default_y = e.target.y();
                                tempShapes[i] = textNode;
                                setShapes(tempShapes);
                                if (props.socket) {
                                    props.socket.send(
                                        JSON.stringify({
                                            command: 'text.story.textNode',
                                            data: {
                                                action: 'update_text_position',
                                                text_id: textAttr.text_id,
                                                x: textNode.x,
                                                y: textNode.y,
                                                default_x: textNode.default_x,
                                                default_y: textNode.default_y,
                                            },
                                        })
                                    );
                                }
                            }}
                            onDblClick={(e) => {
                                setIsTransform(false);
                                setSelectedShape(textAttr);
                                const stageBox = stageRef.current.container().getBoundingClientRect();
                                e.target.hide();
                                setTextAreaAttributes({
                                    x: stageBox.left + textAttr.x,
                                    y: stageBox.top + textAttr.y,
                                    textAreaWidth: e.target.getClientRect().width,
                                    textAreaHeight: e.target.getClientRect().height,
                                });
                                setIsTransform(true);
                            }}
                            onDblTap={(e) => {
                                setIsTransform(false);
                                setSelectedShape(textAttr);
                                const stageBox = stageRef.current.container().getBoundingClientRect();
                                e.target.hide();
                                setTextAreaAttributes({
                                    x: stageBox.left + textAttr.x,
                                    y: stageBox.top + textAttr.y,
                                    textAreaWidth: e.target.getClientRect().width,
                                    textAreaHeight: e.target.getClientRect().height,
                                });
                                setIsTransform(true);
                            }}
                            onTransform={(e) => {
                                let tempShapes = [...shapes];
                                let textNode = { ...tempShapes[i] };
                                textNode.width = e.target.getClientRect().width;
                                tempShapes[i] = textNode;
                                e.target.setAttrs({
                                    width: e.target.getClientRect().width,
                                    x: e.target.x(),
                                    scaleX: 1,
                                });

                                const stageBox = stageRef.current.container().getBoundingClientRect();
                                setTextAreaAttributes({
                                    x: stageBox.left + e.target.x(),
                                    y: stageBox.top + textAttr.y,
                                    textAreaWidth: textNode.width,
                                    textAreaHeight: textNode.height,
                                });
                            }}
                            onTransformEnd={(e) => {
                                let tempShapes = [...shapes];
                                let textNode = { ...tempShapes[i] };
                                textNode.width = e.target.getClientRect().width;
                                textNode.x = e.target.x();
                                textNode.y = e.target.y();
                                textNode.default_x = e.target.x();
                                textNode.default_y = e.target.y();
                                tempShapes[i] = textNode;
                                console.log(tempShapes);
                                setShapes(tempShapes);
                                if (props.socket) {
                                    props.socket.send(
                                        JSON.stringify({
                                            command: 'text.story.textNode',
                                            data: {
                                                action: 'update_text_transform',
                                                text_id: textAttr.text_id,
                                                width: textNode.width,
                                                height: textAttr.height,
                                                x: textNode.x,
                                                y: textNode.y,
                                                default_x: textNode.default_x,
                                                default_y: textNode.default_y,
                                            },
                                        })
                                    );
                                }
                            }}
                        />
                    ))}
                    {selectedShape && isTransform ? (
                        <TransformerComponent selectedShapeID={selectedShape.text_id} stage={stageRef.current} />
                    ) : null}
                </Layer>
            </Stage>
            {selectedShape ? (
                <AutoTextAreaComponent
                    scale={scale}
                    selectedShape={selectedShape}
                    textAreaAttributes={textAreaAttributes}
                    updateTextHeight={updateTextHeight}
                    updateTextValue={updateTextValue}
                    stage={stageRef}
                />
            ) : null}
        </div>
    );
}

export default CanvasText;
