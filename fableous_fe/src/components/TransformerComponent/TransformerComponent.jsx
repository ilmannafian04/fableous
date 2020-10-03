import React, { useState, useRef, useEffect } from 'react';
import { Transformer } from 'react-konva';


function TransformerComponent({selectedShapeID, stage, setValueOfText}) {
    const transformerRef = useRef()

    useEffect(() => {
        if(stage){
            checkNode()
            setTextAreaSpace()
        }
    },[])

    const checkNode = () => {
        const stage = transformerRef.current.getStage();
        const selectedNode = stage.findOne('#' + selectedShapeID);
        console.log(selectedNode)
        // if (selectedNode === transformerRef.current.node()) {
        //     return;
        // }
        if (selectedNode) {
            transformerRef.current.attachTo(selectedNode);
            selectedNode.hide()
        } else {
            console.log(transformerRef.current.anchorStrokeWidth(), " PEPEGA")
            selectedNode.show()
            stage.batchDraw()
            transformerRef.current.detach();

        }
        transformerRef.current.getLayer().batchDraw();
    }

    const setTextAreaSpace = () => {
        console.log(transformerRef.current.anchorStrokeWidth())
    }

    return (
        <React.Fragment>
            <Transformer
                ref={transformerRef}
                keepRatio={true}
                enabledAnchors={['middle-left', 'middle-right']}
                OnTransform={setTextAreaSpace}
                borderEnabled={true}
                rotateEnabled={false}
                borderDash= {[3, 3]}
            />

        </React.Fragment>
    );

}

export default TransformerComponent;
