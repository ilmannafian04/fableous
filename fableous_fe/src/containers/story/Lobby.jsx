import { Box, Container, List, ListItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';

import Role from '../../constant/role';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#2E3138',
    },
    setButton: {
        backgroundColor: '#2F3138',
        color: 'white',
        borderRadius: '50px',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '80%',
        backgroundColor: '#F6F1D3',
        borderRadius: '46px',
    },
    paperInside: {
        width: '97%',
        height: '97%',
        backgroundColor: '#7030A2',
        margin: 'inherit',
        borderRadius: '46px',
    },
    title: {
        fontSize: '70px',
        margin: 0,
        color: '#F6F1D3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    roomCode: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
        margin: 0,
        color: '#F6F1D3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    boxContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    box: {
        flexGrow: 1,
        textAlign: 'left',
    },
    smallTitle: {
        marginBlockEnd: 0,
        color: '#F6F1D3',
    },
    bottomBox: {
        marginTop: '2rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'Center',
    },
    listStyle: {
        backgroundColor: '#F6F1D3',
    },
    success: {
        backgroundColor: '#89c143',
    },
}));

const nameValidator = (name) => {
    let isValid = true;
    if (name.length < 1) isValid = false;
    return isValid;
};

const ArtistForm = ({ socket, isReady, name }) => {
    const [newName, setNewName] = useState('Fableous');
    const classes = useStyles();
    useEffect(() => {
        setNewName(name);
    }, [name]);
    const submitHandler = (event) => {
        event.preventDefault();
        if (socket) {
            socket.send(JSON.stringify({ command: 'draw.lobby.playerState', key: 'name', value: newName }));
        }
    };
    return (
        <form onSubmit={submitHandler}>
            <TextField value={newName} onChange={(event) => setNewName(event.target.value)} disabled={isReady} />
            <Button
                className={classes.setButton}
                type="submit"
                disabled={(!nameValidator(newName) && socket) || isReady || name === newName}
            >
                Set
            </Button>
        </form>
    );
};

const RoleSelect = ({ socket, isReady, selectedRole }) => {
    const clickHandler = (event) => {
        if (socket) {
            socket.send(
                JSON.stringify({ command: 'draw.lobby.playerState', key: 'role', value: parseInt(event.target.value) })
            );
        }
    };
    return (
        <div>
            {[
                { text: 'Background', value: 1 },
                { text: 'Character', value: 2 },
                { text: 'Story', value: 3 },
                { text: 'Hub', value: 4 },
            ].map((button, index) => (
                <button
                    onClick={clickHandler}
                    value={button.value}
                    key={index}
                    disabled={selectedRole === button.value || isReady}
                >
                    {button.text}
                </button>
            ))}
        </div>
    );
};

const PageForm = ({ socket, pageCount }) => {
    const changePageCount = (event) => {
        const value = event.target.value === 'inc' ? pageCount + 1 : pageCount - 1;
        if (value >= 2 && value <= 3) {
            socket.send(
                JSON.stringify({
                    command: 'draw.lobby.lobbyState',
                    key: 'page_count',
                    value: value,
                })
            );
        }
    };
    return (
        <div>
            <span>Page count: {pageCount}</span>
            <button value="inc" onClick={changePageCount}>
                +
            </button>
            <button value="dec" onClick={changePageCount}>
                -
            </button>
        </div>
    );
};

const Lobby = ({ socket, changeState, roomCode, setPlayerState }) => {
    const [lobbyState, setLobbyState] = useState({
        players: [],
        self: { name: 'Fableous', role: 0, isReady: false },
        pageCount: 2,
    });
    const classes = useStyles();
    if (socket) {
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message['type']) {
                case 'lobbyState':
                    setLobbyState(message['data']);
                    break;
                case 'storyState':
                    changeState(message['data']['state']);
                    setPlayerState(message['data']['self']);
                    break;
                default:
                    console.error('Unknown WS message');
            }
        };
    }
    return (
        <div className={classes.root}>
            <div className={classes.paper}>
                <div className={classes.paperInside}>
                    <h1 className={classes.title}>Lobby</h1>
                    <Box className={classes.roomCode}>
                        <h1 className={classes.roomCode}>Room Code {roomCode}</h1>
                    </Box>
                    <Container className={classes.boxContainer}>
                        <Box className={classes.box}>
                            <h2>Your Name: {lobbyState.self.name}</h2>
                            <h3>Role: {Role[lobbyState.self.role]}</h3>
                            <ArtistForm socket={socket} isReady={lobbyState.self.isReady} name={lobbyState.self.name} />
                            <RoleSelect
                                socket={socket}
                                isReady={lobbyState.self.isReady}
                                selectedRole={lobbyState.self.role}
                            />
                            <PageForm socket={socket} pageCount={lobbyState.pageCount} />
                        </Box>
                        <Box className={classes.box}>
                            <h2 className={classes.smallTitle}>Team</h2>
                            <List>
                                {lobbyState.players.map((player, index) => (
                                    <ListItem
                                        className={player.isReady ? classes.success : classes.listStyle}
                                        key={index}
                                    >
                                        <ListItemText
                                            primary={player.name}
                                            secondary={player.role ? Role[player.role] : 'Selecting role'}
                                        />
                                        {player.isReady ? 'Ready' : 'Not ready'}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Container>
                    <Box className={classes.bottomBox}>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                socket.send(
                                    JSON.stringify({
                                        command: 'draw.lobby.playerState',
                                        key: 'isReady',
                                        value: !lobbyState.self.isReady,
                                    })
                                )
                            }
                        >
                            {lobbyState.self.isReady ? 'Cancel' : 'Ready'}
                        </Button>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
