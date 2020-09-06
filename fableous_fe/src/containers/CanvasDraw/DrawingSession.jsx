import React, { useEffect, useState } from 'react';

import CanvasDraw from './CanvasDraw';
import './DrawingSession.css';
import Lobby from './Lobby';
import axios from 'axios';

// Session state
// 0 = Lobby
const DrawingSession = () => {
    const [sessionState, setSessionState] = useState(0);
    const [roomCode, setRoomCode] = useState(null);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        axios
            .get('/api/createsession')
            .then((responce) => {
                setRoomCode(responce.data['roomCode']);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    useEffect(() => {
        if (roomCode) {
            const sock = new WebSocket(`ws://localhost:8000/ws/drawing/${roomCode}/`);
            sock.onopen = () => {
                setSocket(sock);
            };
            return () => sock.close();
        }
    }, [roomCode]);
    let displayedComponent;
    switch (sessionState) {
        case 0:
            displayedComponent = <Lobby socket={socket} changeState={(state) => setSessionState(state)} />;
            break;
        case 1:
            displayedComponent = <CanvasDraw />;
            break;
        default:
            displayedComponent = <Lobby />;
    }
    return (
        <div className="drawing-session-container">
            <h1>Room code: {roomCode}</h1>
            {displayedComponent}
        </div>
    );
};

export default DrawingSession;
