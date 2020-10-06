import React, { useState } from 'react';

import SideBar from '../story/CanvasComponent/SideBar';
import PageBar from '../story/CanvasComponent/PageBar';
import ColorBar from '../story/CanvasComponent/ColorBar';
import MenuAppBar from '../story/CanvasComponent/MenuAppBar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { secondsToMMSS } from '../../utils/formatting';

const CanvasLayout = () => {
    const [drawState, setDrawState] = useState({ timeLeft: 3 * 60, currentPage: 1, pageCount: 0 });

    const [brushSize, setBrushSize] = useState(20);
    const [mode, setMode] = React.useState('brush');

    const modeHandler = (event) => {
        setMode(event.target.value);
    };

    return (
        <div>
            <SideBar />
            <PageBar />
            {/*<ColorBar/>*/}
            <MenuAppBar />

            {/*<button*/}
            {/*    onClick={() => {*/}
            {/*        setBrushSize(5);*/}
            {/*    }}*/}
            {/*>Small*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => {*/}
            {/*        setBrushSize(15);*/}
            {/*    }}*/}
            {/*>Medium*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => {*/}
            {/*        setBrushSize(30);*/}
            {/*    }}*/}
            {/*>Large*/}
            {/*</button>*/}
            {/*<RadioGroup aria-label="tool" name="tool" value={mode} onChange={modeHandler}>*/}
            {/*    <Radio onChange={modeHandler} value="brush" label="Brush" />*/}
            {/*    <Radio onChange={modeHandler} value="eraser" label="Eraser" />*/}
            {/*</RadioGroup>*/}
            <span>
                Page {drawState.currentPage} out of {drawState.pageCount}
            </span>
            <br />
            <span>
                <b>Time left:</b> {secondsToMMSS(drawState.timeLeft)}
            </span>
        </div>
    );
};

export default CanvasLayout;
