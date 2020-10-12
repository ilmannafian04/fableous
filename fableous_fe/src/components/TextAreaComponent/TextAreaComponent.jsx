import React, { useState, useRef, useEffect } from 'react';
import { Transformer } from 'react-konva';

function TextAreaComponent({
    position,
    attrs,
    scale,
    setCurrentTextValue,
    selectedShapeID,
    currentTextValue,
    setTextAreaSpace,
    setTextAttribute,
}) {
    const [dynamicHeight, setDynamicHeight] = useState(attrs.height);
    useEffect(() => {
        handleExpandText();
    }, [attrs]);
    const styles = {
        position: 'absolute',
        top: position.y + 'px',
        left: position.x + 'px',
        bottom: 'auto',
        width: attrs.width - 8,
        boxSizing: 'padding-box',
        height: dynamicHeight,
        padding: 0,
        border: 0,
        background: 'red',
        outline: 'none',
        resize: 'none',
        overflow: 'hidden',
        fontSize: 40 * scale + 'px',
        fontFamily: 'Arial',
        zIndex: 1,
    };

    const handleExpandText = () => {
        const textArea = document.querySelector('textarea');
        console.log(attrs.height);
        console.log(textArea.scrollHeight, 'HERE');
        console.log('CALLED');
        if (attrs.height < textArea.scrollHeight) {
            setDynamicHeight(textArea.scrollHeight + 'px');
            setTextAreaSpace({ width: attrs.width, height: textArea.scrollHeight });
            setTextAttribute({ height: textArea.scrollHeight }, selectedShapeID);
        } else {
            setDynamicHeight(attrs.height);
        }
    };

    const saveText = () => {
        const textArea = document.querySelector('textarea');
        if (textArea.value) {
            setCurrentTextValue(textArea.value);
        }
    };

    return (
        <React.Fragment>
            <div>
                <textarea
                    defaultValue={currentTextValue}
                    style={styles}
                    onChange={() => handleExpandText()}
                    onKeyUp={() => saveText()}
                    rows={1}
                ></textarea>
            </div>
        </React.Fragment>
    );
}

export default TextAreaComponent;
