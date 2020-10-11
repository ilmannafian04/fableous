import React from 'react';
import CanvasDraw from './CanvasDraw';
import CanvasText from '../CanvasText/CanvasText';
import CanvasHub from '../CanvasHub/CanvasHub';

const DrawPage = ({ socket, role }) => {
    let displayedCanvas;
    switch (role) {
        case 1:
        case 2:
            displayedCanvas = <CanvasDraw socket={socket} />;
            break;
        case 3:
            displayedCanvas = <CanvasText socket={socket} />;
            break;
        case 4:
            displayedCanvas = <CanvasHub socket={socket} />;
            break;
        default:
            displayedCanvas = <h1>Uh oh</h1>;
            break;
    }
    return <div>{displayedCanvas}</div>;
};

export default DrawPage;
