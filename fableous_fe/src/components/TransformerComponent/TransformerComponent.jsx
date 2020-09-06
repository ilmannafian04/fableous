import React, { useState, useRef, useEffect } from 'react';
import { Transformer } from 'react-konva';


function TransformerComponent({selectedShapeID, stage}) {
    const transformerRef = useRef()

    useEffect(() => {
        if(stage){
            checkNode()
        }
    },[])

    const checkNode = () => {
        const stage = transformerRef.current.getStage();
        const selectedNode = stage.findOne('#' + selectedShapeID);
        console.log(selectedNode)
        if (selectedNode === transformerRef.current.node()) {
            return;
        }
        if (selectedNode) {
            transformerRef.current.attachTo(selectedNode);
        } else {
            transformerRef.current.detach();
        }
        transformerRef.current.getLayer().batchDraw();
    }

    return (
        <Transformer
            ref={transformerRef}
        />
    );

}

export default TransformerComponent;
