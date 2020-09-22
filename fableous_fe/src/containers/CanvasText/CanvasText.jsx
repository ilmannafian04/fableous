import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text,Transformer } from 'react-konva';
import {v1 as uuid} from "uuid";

import useWindowSize from '../../utils/hooks/useWindowSize';
import {calculateHeightBasedOnRatio} from "../../helper/CanvasHelperFunctions/calculateHeightBasedOnRatio";
import {DEFAULT_HEIGHT_CANVAS, DEFAULT_WIDTH_CANVAS} from "../../constants/ScreenRatio";
import TransformerComponent from "../../components/TransformerComponent/TransformerComponent";
import TextAreaComponent from "../../components/TextAreaComponent/TextAreaComponent";



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
    const [textAreaSpace, setTextAreaSpace] = useState({width:0,height:0});
    const [shapes, setShapes] = useState([]);
    const [currentTextValue, setCurrentTextValue] = useState('')

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

        stageRef.current.batchDraw()
    },[width,height , scale])

    useEffect( () => {
        stageRef.current.batchDraw()
    },[shapes,selectedShape])


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
        if(selectedShape) {
            const selectedNode = stageRef.current.findOne('#' + selectedShape);
            const position = selectedNode.getAbsolutePosition()
            const stageBox = stageRef.current.container().getBoundingClientRect();
            console.log(selectedNode.height())
            setTextAreaSpace({width: selectedNode.width(), height: selectedNode.height()})
            setAbsolutePosition({x:stageBox.left+ position.x, y:stageBox.top+ position.y})
        }
    },[scale])



    const drawText = () => {
        createTextNode()
    };


    const createTextNode = () => {
        const text_id = uuid()
        const textNode = {
            text: "A",
            x: 160 ,
            y: 90,
            fontSize: 40 * scale,
            draggable: true,
            width: 200,
            height:40,
            text_id,
            default_x:160,
            default_y: 90,
            default_fontSize: 40 * scale,
            default_width: 200,
            textScale: scale,

        }
        setShapes(shapes.concat(textNode))
    }

    const outsideTextPress = () => {
        setValueOfText(currentTextValue, selectedShape)
        // console.log(currentTextValue)
        // console.log(selectedShape)
        setCurrentTextValue('')
        setSelectedShape(null)
        if(selectedShape) {
            const selectedNode = stageRef.current.findOne('#' + selectedShape);
            selectedNode.show()
        }
        setSelectedShape(null)
    }

    const setValueOfText = (newText, id) => {
        let tempShapes = [...shapes]
        const position = tempShapes.findIndex(node => node.text_id === id)
        let textNode = {...tempShapes[position]};
        textNode.text = newText
        tempShapes[position] = textNode
        setShapes(tempShapes);
        console.log(newText, " HERE")
    }

    const setTextAttribute = (attributes, index) => {
        let tempShapes = [...shapes]
        let textNode = {...tempShapes[index]};
        const position = tempShapes.findIndex(node => node.text_id === index)
        for (const [key, value] of Object.entries(attributes)) {
            textNode[key] = value;
        }
        tempShapes[index] = textNode
        setShapes(tempShapes);
    }



    return (
        <div ref={headerRef} style={{ width: '100%', height: '100%' }}>
            <h1> {scale}</h1>
            <button onClick={drawText}> TEXT </button>
            <Stage
                width={availSpace.width}
                height={availSpace.height}
                ref={stageRef}
                onTap={()=> outsideTextPress()}
                onClick={()=> outsideTextPress()}
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

                                  onDoubleClick={() => {
                                      console.log(selectedShape,"HERE")
                                      setSelectedShape(textAttr.text_id)
                                  }}

                                  onDblTap={(e)=>{
                                      console.log(selectedShape,"MOB")
                                      setSelectedShape(textAttr.text_id)
                                      const position = e.target.getAbsolutePosition()
                                      const stageBox = stageRef.current.container().getBoundingClientRect();
                                      setTextAreaSpace({width: textAttr.width, height: e.target.height()})
                                      setAbsolutePosition({x:stageBox.left+ position.x, y:stageBox.top+ position.y})
                                      console.log(textAttr.text)
                                      e.target.hide()
                                      setCurrentTextValue(textAttr.text)
                                  }}

                                  onTransform={
                                      (e)=> {
                                          let tempShapes = [...shapes]
                                          let textNode = {...tempShapes[i]};
                                          textNode.width = e.target.getClientRect().width
                                          tempShapes[i] = textNode
                                          setShapes(tempShapes);
                                          setTextAreaSpace({width: textAttr.width, height: e.target.height()})
                                          console.log(e.target.getClientRect())
                                      }
                                  }
                            />
                    ))}
                    { selectedShape ?
                        <TransformerComponent
                            selectedShapeID={selectedShape}
                            stage={stageRef.current}
                            setValueOfText={setValueOfText}
                        /> :
                        null
                    }
                </Layer>
            </Stage>
            { selectedShape  && currentTextValue !== ''?
                <TextAreaComponent
                    position={absolutePosition}
                    scale={scale}
                    stage={stageRef}
                    attrs={textAreaSpace}
                    currentTextValue={currentTextValue}
                    setCurrentTextValue={setCurrentTextValue}
                    selectedShapeID={selectedShape}
                    setTextAreaSpace={setTextAreaSpace}
                />  :
                null
            }
        </div>
    );
}

export default CanvasText;
