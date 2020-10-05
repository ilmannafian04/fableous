import React, {
    useState,
    useEffect,
    useRef,
} from "react";

const AutoTextArea = (props) => {
    const textAreaRef = useRef(null);
    const [text, setText] = useState("");
    const [textAreaHeight, setTextAreaHeight] = useState('auto');
    const [parentHeight, setParentHeight] = useState(props.textAreaAttributes.textAreaHeight);


    const styles= {
        height: textAreaHeight,
        maxHeight: props.stage.current.height(),
        padding:0,
        border:0,
        // left:0,
        // top:0,
        overflow:'hidden',
        background: 'none',
        outline:'none',
        resize:'none',
        fontSize:40 * props.scale +'px',
        fontFamily:'Arial',
        lineHeight:1,
        width: props.textAreaAttributes.textAreaWidth - 3,

    }

    useEffect(() => {
        setParentHeight(textAreaRef.current.scrollHeight);
        setTextAreaHeight(textAreaRef.current.scrollHeight);
        if(props.selectedShape.height < parentHeight) {
            props.updateTextHeight(props.selectedShape.text_id,parentHeight)
        }
    }, [text, props.textAreaAttributes.textAreaWidth]);

    const onChangeHandler = (event) => {
        setTextAreaHeight("auto");
        setParentHeight(textAreaRef.current.scrollHeight);
        setText(event.target.value);
        props.updateTextValue(props.selectedShape.text_id,event.target.value)
    };

    return (
            <div
                style={{
                    minHeight: parentHeight,
                    position:'absolute',
                    float:'left',
                    left: props.textAreaAttributes.x +'px',
                    top: props.textAreaAttributes.y +'px',
                }}
            >
			<textarea
                onKeyDown={(event) => onChangeHandler}
                ref={textAreaRef}
                style={
                    styles
                }
                defaultValue={props.selectedShape.text}
                onChange={onChangeHandler}
            />
            </div>
        // </div>
    );
};

export default AutoTextArea;
