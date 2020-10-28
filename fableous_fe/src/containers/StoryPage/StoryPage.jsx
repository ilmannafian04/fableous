import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Canvas from './canvas/Canvas';
import Lobby from './Lobby';
import { baseUrl, wsProtocol } from '../../constant/url';
import socketAtom from '../../atom/socketAtom';
import storyAtom, { storyDefault } from '../../atom/storyAtom';

const useStyles = makeStyles(() =>
    createStyles({
        drawingSessionContainer: {
            width: '720px',
        },
    })
);

const StoryPage = () => {
    const setSocket = useSetRecoilState(socketAtom);
    const [storyState, setStoryState] = useRecoilState(storyAtom);
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
            const rootHandler = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === 'storyState') {
                    setStoryState((prev) => {
                        return { ...prev, state: message.data.state };
                    });
                } else if (message.type === 'finish') {
                    history.push('/');
                }
            };
            sock.addEventListener('message', rootHandler);
            sock.addEventListener('error', backToHome);
            sock.addEventListener('close', backToHome);
            return () => {
                sock.removeEventListener('message', rootHandler);
                sock.removeEventListener('error', backToHome);
                sock.removeEventListener('close', backToHome);
                sock.close();
            };
        }
    }, [joinCode, setSocket, history, setStoryState]);
    let displayedComponent;
    useEffect(() => {
        return () => {
            setStoryState(storyDefault);
        };
    }, [setStoryState]);
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
