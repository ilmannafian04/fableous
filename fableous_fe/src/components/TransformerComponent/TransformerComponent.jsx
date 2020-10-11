import React, { useRef, useEffect } from 'react';
import { Transformer } from 'react-konva';

function TransformerComponent({ selectedShapeID, stage }) {
    const transformerRef = useRef();

    useEffect(() => {
        if (stage) {
            checkNode();
            setTextAreaSpace();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stage]);

    const checkNode = () => {
        const stage = transformerRef.current.getStage();
        const selectedNode = stage.findOne('#' + selectedShapeID);
        if (selectedNode) {
            transformerRef.current.attachTo(selectedNode);
            selectedNode.hide();
        } else {
            console.log(transformerRef.current.anchorStrokeWidth(), ' PEPEGA');
            selectedNode.show();
            stage.batchDraw();
            transformerRef.current.detach();
        }
        transformerRef.current.getLayer().batchDraw();
    };

    const setTextAreaSpace = () => {
        console.log(transformerRef.current.anchorStrokeWidth());
    };

    return (
        <React.Fragment>
            <Transformer
                ref={transformerRef}
                keepRatio={true}
                enabledAnchors={['middle-left', 'middle-right']}
                OnTransform={setTextAreaSpace}
                borderEnabled={true}
                rotateEnabled={false}
                borderDash={[3, 3]}
            />
        </React.Fragment>
    );
}

export default TransformerComponent;
