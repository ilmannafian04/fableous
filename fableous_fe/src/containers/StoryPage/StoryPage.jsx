import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Canvas from './canvas/Canvas';
import Lobby from './Lobby';
import { baseUrl, wsProtocol } from '../../constant/url';
import socketAtom from '../../atom/socketAtom';
import storyAtom from '../../atom/storyAtom';

const useStyles = makeStyles(() =>
    createStyles({
        drawingSessionContainer: {
            width: '720px',
        },
    })
);

const StoryPage = () => {
    const setSocket = useSetRecoilState(socketAtom);
    const storyState = useRecoilValue(storyAtom);
    const { joinCode } = useParams();
    const history = useHistory();
    const classes = useStyles();
    useEffect(() => {
        if (joinCode) {
            const sock = new WebSocket(`${baseUrl(wsProtocol)}/ws/drawing/${joinCode}/`);
            sock.onopen = () => {
                setSocket(sock);
            };
            const backToHome = () => history.push('/');
            const echoHandler = (event) => console.log(JSON.parse(event.data));
            sock.addEventListener('message', echoHandler);
            sock.addEventListener('error', backToHome);
            sock.addEventListener('close', backToHome);
            return () => {
                sock.removeEventListener('message', echoHandler);
                sock.removeEventListener('error', backToHome);
                sock.removeEventListener('close', backToHome);
                sock.close();
            };
        }
    }, [joinCode, setSocket, history]);
    let displayedComponent;
    switch (storyState.state) {
        case 0:
            displayedComponent = <Lobby />;
            break;
        case 1:
            displayedComponent = <Canvas />;
            break;
        default:
            displayedComponent = <Lobby />;
    }
    return <div className={classes.drawingSessionContainer}>{displayedComponent}</div>;
};

export default StoryPage;
