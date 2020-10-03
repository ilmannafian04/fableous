import React, {
    useState,
    useEffect,
    useRef,
} from "react";

const AutoTextArea = (props) => {
    const textAreaRef = useRef(null);
    const [text, setText] = useState("");
    const [textAreaHeight, setTextAreaHeight] = useState("auto");
    const [parentHeight, setParentHeight] = useState(props.textAreaSize.textAreaHeight);


    const styles= {
        boxSizing: 'padding-box',
        height: textAreaHeight,
        padding:0,
        border:0,
        // left:0,
        // top:0,
        background: 'none',
        outline:'none',
        resize:'none',
        fontSize:40 * props.scale +'px',
        fontFamily:'Arial',
        position:'absolute',
        lineHeight:1,
        float:'left',
        left: props.position.x +'px',
        top: props.position.y +'px', width: props.textAreaSize.textAreaWidth,

    }

    useEffect(() => {
        setParentHeight(textAreaRef.current.scrollHeight);
        setTextAreaHeight(textAreaRef.current.scrollHeight);
        console.log(props.selectedShape.height < textAreaHeight,props.selectedShape.height,parentHeight)
        if(props.selectedShape.height < parentHeight) {
            props.updateTextHeight(props.selectedShape.text_id,parentHeight)
        }
    }, [text]);

    const onChangeHandler = (event) => {
        setTextAreaHeight("auto");
        setParentHeight(textAreaRef.current.scrollHeight);
        setText(event.target.value);
        props.updateTextValue(props.selectedShape.text_id,event.target.value)
        console.log(text)
    };

    return (
        // <div style={{position:'absolute',background:'orange',left: props.position.x +'px',
        //     top: props.position.y +'px', width: props.textAreaSize.textAreaWidth, }}>
        //     <div
        //         style={{
        //             minHeight: parentHeight,
        //             position:'relative',
        //             overflow:'hidden',
        //             padding:0,
        //             border:0,
        //         }}
        //     >
			<textarea
                onKeyDown={(event) => onChangeHandler}
                ref={textAreaRef}
                rows={1}
                style={
                    styles
                }
                defaultValue={props.selectedShape.text}
                onChange={onChangeHandler}
            />
        //     </div>
        // </div>
    );
};

export default AutoTextArea;
