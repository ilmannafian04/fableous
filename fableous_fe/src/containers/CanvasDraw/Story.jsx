import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CanvasDraw from './CanvasDraw';
import './DrawingSession.css';
import Lobby from './Lobby';
import { baseUrl, wsProtocol } from '../../constant/url';

// Session state
// 0 = Lobby
const Story = () => {
    const [sessionState, setSessionState] = useState(0);
    const [roomCode, setRoomCode] = useState(null);
    const [socket, setSocket] = useState(null);
    const { joinCode } = useParams();
    useEffect(() => {
        if (joinCode) {
            setRoomCode(joinCode);
        } else {
            axios
                .get('/api/createsession')
                .then((responce) => {
                    setRoomCode(responce.data['roomCode']);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [joinCode]);
    useEffect(() => {
        if (roomCode) {
            const sock = new WebSocket(`${baseUrl(wsProtocol)}/ws/drawing/${roomCode}/`);
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
            displayedComponent = <CanvasDraw socket={socket} />;
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

export default Story;
