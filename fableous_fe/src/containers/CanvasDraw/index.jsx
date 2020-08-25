import React, {useState, useRef, useEffect} from "react";
import { addLine } from "./Line"
import {Stage, Layer, Image} from "react-konva";

const DRAWING = "drawing"
const ERASER = "eraser"

function CanvasDraw() {
    const [color, setColor] = useState("red")
    const [mode, setMode] = useState(null)
    const [canvas, setCanvas] = useState(null)
    const [context,setContext] = useState(null)
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    const headerRef = useRef()
    const stageEl = React.createRef();
    const layerEl = React.createRef();
    const imageEl = React.createRef();

    useEffect(() => {
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext("2d");
        console.log(headerRef.current.getBoundingClientRect().height)
        setCanvas(canvas)
        setContext(context)

    },[headerRef])

    useEffect(() => {
        detachLineStageCanvasEvent()
        console.log(color," after")
        addLine()
    }, [color]);



    const changeColor = () => {
        console.log(color, " before")
        console.log(layerEl.current)
        color === "red" ? setColor("blue") : setColor("red")
        console.log(stageEl.current)
    }

    const detachLineStageCanvasEvent = () => {
        stageEl.current.getStage().off('touchstart')
        stageEl.current.getStage().off("touchend")
        stageEl.current.getStage().off('touchmove')
        stageEl.current.getStage().off('mousedown')
        stageEl.current.getStage().off('mouseup')
        stageEl.current.getStage().off('mousemove')
    }

    const drawLine = () => {
        setMode(DRAWING)
        console.log("NO")
        if(mode === DRAWING){
            detachLineStageCanvasEvent()
            addLine(stageEl.current.getStage(), layerEl.current,imageEl.current,context, color, "brush");
        }
    };


    return (
        <div className="home-page">
            <div ref={headerRef}>
                <h1>Whiteboard ver 5. </h1>
                <h5> current color: {color} </h5>
                <button variant="secondary" onClick={drawLine}>
                    Line
                </button>
                <button variant="secondary" onClick={changeColor}>
                    Change
                </button>
            </div>
            <Stage
                width={1280}
                height={800}
                ref={stageEl}
                draggable={false}
            >
                <Layer ref={layerEl} listening={false}>
                    <Image
                        image={canvas}
                        ref={imageEl}
                        width={window.innerWidth}
                        height={window.innerHeight}
                        stroke={"black"}
                    />
                </Layer>
            </Stage>
        </div>
    );
}
export default CanvasDraw;
