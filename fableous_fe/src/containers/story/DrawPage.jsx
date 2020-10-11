import React from 'react';
import CanvasDraw from './CanvasDraw';

const DrawPage = ({ socket, role }) => {
    let displayedCanvas;
    switch (role) {
        case 1:
        case 2:
            displayedCanvas = <CanvasDraw socket={socket} />;
            break;
        case 3:
            displayedCanvas = <h1>Text canvas</h1>;
            break;
        case 4:
            displayedCanvas = <h1>Hub canvas</h1>;
            break;
        default:
            displayedCanvas = <h1>Uh oh</h1>;
            break;
    }
    return <div>{displayedCanvas}</div>;
};

export default DrawPage;
