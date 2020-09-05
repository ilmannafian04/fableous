import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text } from 'react-konva';
import {v1 as uuid} from "uuid";

import useWindowSize from '../../utils/hooks/useWindowSize';
import {calculateHeightBasedOnRatio} from "../../helper/CanvasHelperFunction/calculateHeightBasedOnRatio";
import {DEFAULT_HEIGHT_CANVAS, DEFAULT_WIDTH_CANVAS} from "../../constants/ScreenRatio";



function CanvasText() {
    // Window Size
    const { width, height } = useWindowSize();

    // Canvas State
    const [canvas] = useState(document.createElement('canvas'));
    const [canvasIsReady, setCanvasIsReady] = useState(false);
    const [context, setContext] = useState(null);
    const [isDragging, setIsDragging] = React.useState(false);

    // Dynamic Sizing States
    const [lastPointerPosition, setLastPointerPosition] = useState(null);
    const [availSpace, setAvailSpace] = useState({ width: 0, height: 0 });
    const [shapes, setShapes] = useState([]);

    // Context States
    const [scale, setScale] = useState(1);

    const imageRef = useRef();
    const stageRef = useRef();
    const layerRef = useRef()
    const headerRef = useRef();


    useEffect(() => {
        if (headerRef.current) {
            const totalScale = headerRef.current.offsetWidth / DEFAULT_WIDTH_CANVAS;
            const availableSpaceBasedOnRatio = calculateHeightBasedOnRatio(headerRef.current);
            setScale(totalScale)
            setAvailSpace(availableSpaceBasedOnRatio)
        }


        console.log(shapes)
        console.log(layerRef.current.children)
        stageRef.current.batchDraw()
    }, [width, height, scale]);

    useEffect( () => {
        if(shapes) {
            let tempTextArray = [...shapes]
            console.log(scale)
            tempTextArray.forEach((textNode) => {
                console.log(textNode.x,"PAPPA")
                textNode.x = textNode.default_x * (scale/textNode.textScale)
                textNode.y = textNode.default_y * (scale/textNode.textScale)
                textNode.fontSize = textNode.default_fontSize * (scale/textNode.textScale)
                textNode.width = textNode.default_width * (scale/textNode.textScale)
            })

            setShapes(tempTextArray)
        }
        stageRef.current.batchDraw()
    },[width,height , scale])

    useEffect( () => {
        console.log("DADADA")
        stageRef.current.batchDraw()
    },[shapes])


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
    }, [canvasIsReady, canvas, layerRef]);



    const drawText = () => {
        createTextNode()
    };


    const createTextNode = () => {
        const text_id = uuid()
        const textNode = {
            text: "type here" + Math.random(),
            x: 160 ,
            y: 90,
            fontSize: 20,
            draggable: true,
            width: 200,
            text_id,
            default_x:160,
            default_y: 90,
            default_fontSize: 20,
            default_width: 200,
            textScale: scale,

        }
        setShapes(shapes.concat(textNode))
    }


    return (
        <div ref={headerRef} style={{ width: '100%', height: '100%' }}>
            <h1> {scale}</h1>
            <button onClick={drawText}> TEXT </button>
            <Stage width={availSpace.width} height={availSpace.height} ref={stageRef} >
                <Layer ref={layerRef} >
                    {shapes.map((textAttr, i) => (
                        <Text key={i}
                              text={textAttr.text}
                                x= {textAttr.x}
                                y={textAttr.y}
                                fontSize={textAttr.fontSize}
                                draggable={true}
                                width={textAttr.width}
                                keepRatio={true}
                                onDragStart={() => {
                                      setIsDragging(true);
                                }}
                                  onDragEnd={(e) => {
                                      let tempShapes = [...shapes]
                                      let textNode = {...tempShapes[i]};
                                      textNode.x = e.target.x()
                                      textNode.y = e.target.y()
                                      textNode.default_x = e.target.x()
                                      textNode.default_y = e.target.y()
                                      console.log(textNode.default_x,textNode.default_y, "PEO")
                                      tempShapes[i] = textNode
                                      setShapes(tempShapes);
                                      setIsDragging(false)
                                  }}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}

export default CanvasText;
