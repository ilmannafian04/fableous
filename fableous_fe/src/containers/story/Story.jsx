import { createStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DrawPage from './DrawPage';
import Lobby from './Lobby';
import { baseUrl, wsProtocol } from '../../constant/url';

const useStyles = makeStyles(() =>
    createStyles({
        drawingSessionContainer: {
            width: '720px',
        },
    })
);

// Session state
// 0 = Lobby
const Story = () => {
    const [sessionState, setSessionState] = useState(0);
    const [roomCode, setRoomCode] = useState(null);
    const [socket, setSocket] = useState(null);
    const [playerState, setPlayerState] = useState({ name: '', role: 0 });
    const { joinCode } = useParams();
    const classes = useStyles();
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
    const changeState = (state) => setSessionState(state);
    const setFinalPlayerState = (state) => setPlayerState(state);
    useEffect(() => {
        console.log(playerState);
    }, [playerState]);
    let displayedComponent;
    switch (sessionState) {
        case 0:
            displayedComponent = (
                <Lobby
                    socket={socket}
                    roomCode={roomCode}
                    changeState={changeState}
                    setPlayerState={setFinalPlayerState}
                />
            );
            break;
        case 1:
            displayedComponent = <DrawPage socket={socket} role={playerState.role} />;
            break;
        default:
            displayedComponent = <Lobby />;
    }
    return <div className={classes.drawingSessionContainer}>{displayedComponent} </div>;
};

export default Story;
