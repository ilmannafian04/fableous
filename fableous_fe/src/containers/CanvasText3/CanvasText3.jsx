import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text,Transformer } from 'react-konva';
import {v1 as uuid} from "uuid";

import useWindowSize from '../../utils/hooks/useWindowSize';
import {calculateHeightBasedOnRatio} from "../../helper/CanvasHelperFunctions/calculateHeightBasedOnRatio";
import {DEFAULT_HEIGHT_CANVAS, DEFAULT_WIDTH_CANVAS} from "../../constants/ScreenRatio";
import TransformerComponent from "../../components/TransformerComponent/TransformerComponent";
import TextAreaComponent from "../../components/TextAreaComponent/TextAreaComponent";

import { useDoubleTap, useSingleTap } from 'use-double-tap';
import AutoTextArea from '../CanvasText2/CanvasText2';

function CanvasText() {
    // Window Size
    const { width, height } = useWindowSize();

    // Canvas State
    const [canvas] = useState(document.createElement('canvas'));
    const [canvasIsReady, setCanvasIsReady] = useState(false);
    const [context, setContext] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Dynamic Sizing States
    const [lastPointerPosition, setLastPointerPosition] = useState(null);
    const [availSpace, setAvailSpace] = useState({ width: 0, height: 0 });
    const [selectedShape, setSelectedShape] = useState(null);
    const [absolutePosition, setAbsolutePosition] = useState({x:0,y:0});
    const [shapes, setShapes] = useState([]);
    const [isTransform,setIsTransform] = useState(false)
    const [textAreaSize, setTextAreaSize] = useState({textAreaWidth:0,textAreaHeight:0});
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



        stageRef.current.batchDraw()
    }, [width, height, scale]);

    useEffect( () => {
        if(shapes) {
            let tempTextArray = [...shapes]
            tempTextArray.forEach((textNode) => {
                textNode.x = textNode.default_x * (scale/textNode.textScale)
                textNode.y = textNode.default_y * (scale/textNode.textScale)
                textNode.fontSize = textNode.default_fontSize * (scale/textNode.textScale)
                textNode.width = textNode.default_width * (scale/textNode.textScale)
            })

            setShapes(tempTextArray)
        }

        outsideTextPress()
        stageRef.current.batchDraw()
    },[width,height , scale])

    useEffect( () => {
        stageRef.current.draw()
    },[shapes,selectedShape,absolutePosition])


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

    useEffect(() => {
        setSelectedShape(null)
    },[scale])



    const drawText = () => {
        createTextNode()
    };


    const createTextNode = () => {
        const text_id = uuid()
        const textNode = {
            text_id: text_id,
            text: "Type Here",
            x: 160 ,
            y: 90,
            fontSize: 40 * scale,
            draggable: true,
            width: 200,
            height:40,
            default_x:160,
            default_y: 90,
            default_fontSize: 40 * scale,
            default_width: 200,
            textScale: scale,

        }
        setShapes(shapes.concat(textNode))
    }

    const outsideTextPress = () => {
        setSelectedShape(null)
        if(selectedShape) {
            const selectedNode = stageRef.current.findOne('#' + selectedShape.text_id);
            selectedNode.show()
        }
        setTextAreaSize({textAreaWidth: 0,textAreaHeight: 0})
        setSelectedShape(null)
    }

    const setTextAttribute = (attributes, index) => {
        let tempShapes = [...shapes]
        const position = tempShapes.findIndex(node => node.text_id === index)
        let textNode = {...tempShapes[position]};
        for (const [key, value] of Object.entries(attributes)) {
            textNode[key] = value;
        }
        tempShapes[index] = textNode
        setShapes(tempShapes);
    }
    const updateTextHeight = (text_id,height) => {
        let tempShapes = [...shapes]
        const position = tempShapes.findIndex(node => node.text_id === text_id)
        let textNode = {...tempShapes[position]};
        textNode.height = height
        tempShapes[position] = textNode
        setShapes(tempShapes);
    }

    const updateTextValue = (text_id,text_value) => {
        let tempShapes = [...shapes]
        const position = tempShapes.findIndex(node => node.text_id === text_id)
        let textNode = {...tempShapes[position]};
        textNode.text = text_value
        tempShapes[position] = textNode
        setShapes(tempShapes);
    }




    return (
        <div ref={headerRef} style={{width:'100%',height: '100%',position:'relative',background:'yellow',overflow:'hidden' }}>
            <button onClick={drawText}> TEXT </button>
            <Stage
                width={availSpace.width}
                height={availSpace.height}
                ref={stageRef}
                onTap={()=> outsideTextPress()}
                onClick={()=> outsideTextPress()}
                stroke={'black'}
            >
                <Layer ref={layerRef}>
                    {shapes.map((textAttr, i) => (
                        <Text key={i}
                              id={textAttr.text_id}
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
                                  tempShapes[i] = textNode
                                  setShapes(tempShapes);
                                  setIsDragging(false)
                              }}

                              onDblTap={(e)=>{
                                  setIsTransform(false)
                                  setSelectedShape(textAttr)
                                  const stageBox = stageRef.current.container().getBoundingClientRect();
                                  setAbsolutePosition({x:stageBox.left+ textAttr.x, y:stageBox.top+ textAttr.y})
                                  e.target.hide()
                                  setTextAreaSize({textAreaWidth: textAttr.width , textAreaHeight: textAttr.height})
                                  setIsTransform(true)
                              }}

                              onTransform={
                                  (e)=> {
                                      let tempShapes = [...shapes]
                                      let textNode = {...tempShapes[i]};
                                      textNode.width = e.target.getClientRect().width
                                      tempShapes[i] = textNode
                                      setShapes(tempShapes);
                                      e.target.setAttrs({
                                          width: e.target.width() * e.target.scaleX(),
                                          scaleX: 1,
                                      })
                                      textNode.x = e.target.x()
                                      textNode.y = e.target.y()
                                      textNode.default_x = e.target.x()
                                      textNode.default_y = e.target.y()
                                      tempShapes[i] = textNode
                                      setShapes(tempShapes);
                                      const stageBox = stageRef.current.container().getBoundingClientRect();
                                      setAbsolutePosition({x:stageBox.left+ textAttr.x, y:stageBox.top+ textAttr.y})
                                      setTextAreaSize({textAreaWidth: textNode.width, textAreaHeight: textNode.height})
                                  }
                              }

                              onChange={
                                  (e)=> {
                                      let tempShapes = [...shapes]
                                      let textNode = {...tempShapes[i]};
                                      textNode.height = e.target.getClientRect().height
                                      tempShapes[i] = textNode
                                      setShapes(tempShapes);
                                  }
                              }
                        />
                    ))}
                    { selectedShape && isTransform ?
                        <TransformerComponent
                            selectedShapeID={selectedShape.text_id}
                            stage={stageRef.current}
                        /> :
                        null
                    }
                </Layer>
            </Stage>
            { selectedShape ?
                <AutoTextArea
                    position={absolutePosition}
                    scale={scale}
                    selectedShape={selectedShape}
                    textAreaSize={textAreaSize}
                    updateTextHeight={updateTextHeight}
                    updateTextValue={updateTextValue}
                />  :
                null
            }
        </div>
    );
}

export default CanvasText;
