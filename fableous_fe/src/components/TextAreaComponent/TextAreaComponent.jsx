import React, { useState, useRef, useEffect } from 'react';
import { Transformer } from 'react-konva';


function TextAreaComponent({position,attrs,scale, setCurrentTextValue,currentTextValue,setTextAreaSpace}) {
    const [dynamicHeight, setDynamicHeight] = useState(attrs.height)
    useEffect(()=> {
        handleExpandText()
    },[])
    const styles= {
        position:'absolute',
        top: position.y +'px',
        left: position.x +'px',
        width:attrs.width - 3 ,
        height: dynamicHeight,
        border:0,
        background: 'none',
        outline:'none',
        resize:'none',
        fontSize:40 * scale + 'px',
        fontFamily:'Arial',

    }

    const handleExpandText = () => {
        const textArea = document.querySelector('textarea')
        console.log(attrs.height)
        console.log(textArea.scrollHeight)
        if (attrs.height < textArea.scrollHeight){
            setDynamicHeight(textArea.scrollHeight+ 'px')
            setTextAreaSpace({height:textArea.scrollHeight})
        }
    }

    const saveText = () => {
        const textArea = document.querySelector('textarea')
        if (textArea.value) {
            setCurrentTextValue(textArea.value)
        }
    }

    return (
        <React.Fragment>
            <textarea
                defaultValue={currentTextValue}
                style={styles}
                onChange={() => handleExpandText()}
                onKeyUp={()=> saveText()}
            >
            </textarea>
        </React.Fragment>
    );

}

export default TextAreaComponent;
