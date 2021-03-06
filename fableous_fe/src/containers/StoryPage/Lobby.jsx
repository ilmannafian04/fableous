import { Box, Container, List, ListItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import Background from '../../assets/icons/background.png';
import Character from '../../assets/icons/character.png';
import Story from '../../assets/icons/story.png';
import Hub from '../../assets/icons/hub.png';
import Role from '../../constant/role';
import storyAtom from '../../atom/storyAtom';
import socketAtom from '../../atom/socketAtom';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#2E3138',
        color: '#F6F1D3',
    },
    setButton: {
        backgroundColor: '#61DBFB',
        color: 'black',
        borderRadius: '50px',
        margin: '0 1rem',
        '&:disabled': {
            opacity: '0.5',
        },
        '&:hover': {
            opacity: '0.75',
        },
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
        color: 'black',
        backgroundColor: '#F6F1D3',
    },
    success: {
        color: 'black',
        backgroundColor: '#89C143',
    },
    divider: {
        borderRadius: '5px',
        borderTop: '2px solid #bbb',
        width: '90%',
    },
    pageButton: {
        background: '#3f51b5',
        width: '30px',
        height: '30px',
        borderRadius: '30%',
        margin: '2px 0.75rem 2px 0.75rem',
        border: '0',
        color: 'white',
        '&:hover': {
            background: '#3f94b5',
        },
    },
    formFlex: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textField: {
        backgroundColor: '#F6F1D3',
        borderRadius: '5px',
        padding: '0.25rem 0.5rem',
        margin: '0.25rem',
    },
    pageCountWrapper: {
        maxWidth: 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
    },
    headerCount: {
        fontSize: '1.5rem',
        margin: '-0.5rem 0 0 0',
    },
}));

const buttonRoleUseStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        margin: '1rem 0',
    },

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#F6F1D3',
    },

    button: {
        width: '50px',
        height: '50px',
        background: 'red',
        textDecoration: 'none',
        textAlign: 'center',
        margin: '4px 1rem',
        borderRadius: '50%',
        cursor: 'pointer',
        padding: '10px',
        '&:hover': {
            opacity: '0.7',
        },
        '&:disabled': {
            opacity: '0.35',
        },
    },
    image: {
        width: '26px',
        height: '26px',
    },
    disabledButton: {
        backgroundColor: 'red',
    },
}));

const nameValidator = (name) => {
    let isValid = true;
    if (name.length < 1) isValid = false;
    return isValid;
};

const ArtistForm = () => {
    const [newName, setNewName] = useState('Fableous');
    const storyState = useRecoilValue(storyAtom);
    const socket = useRecoilValue(socketAtom);
    const classes = useStyles();
    const submitHandler = (event) => {
        event.preventDefault();
        if (socket) {
            socket.send(JSON.stringify({ command: 'draw.lobby.playerState', key: 'name', value: newName }));
        }
    };
    return (
        <form onSubmit={submitHandler} className={classes.formFlex}>
            <TextField
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                disabled={storyState.self.isReady}
                className={classes.textField}
            />
            <Button
                className={classes.setButton}
                type="submit"
                disabled={
                    (!nameValidator(newName) && socket) || storyState.self.isReady || storyState.self.name === newName
                }
            >
                Set
            </Button>
        </form>
    );
};

const RoleSelect = () => {
    const storyState = useRecoilValue(storyAtom);
    const socket = useRecoilValue(socketAtom);
    const clickHandler = (val) => {
        if (socket) {
            socket.send(JSON.stringify({ command: 'draw.lobby.playerState', key: 'role', value: parseInt(val) }));
        }
    };
    const buttonClass = buttonRoleUseStyles();
    return (
        <div className={buttonClass.container}>
            {[
                { text: 'Background', value: 1, image: Background, color: '#067A00', selected: '#000000' },
                { text: 'Character', value: 2, image: Character, color: '#00CEE6', selected: '#000000' },
                { text: 'Story', value: 3, image: Story, color: '#FA9600', selected: '#000000' },
                { text: 'Hub', value: 4, image: Hub, color: '#E71D36', selected: '#000000' },
            ].map((button, index) => (
                <div className={buttonClass.wrapper} key={index}>
                    <button
                        className={buttonClass.button}
                        onClick={() => clickHandler(button.value)}
                        value={button.value}
                        disabled={storyState.self.role !== button.value && storyState.self.isReady}
                        style={{
                            background: button.color,
                            borderStyle: storyState.self.role === button.value ? 'solid' : 'none',
                            borderColor: button.selected,
                            borderWidth: 3,
                        }}
                    >
                        <img className={buttonClass.image} src={button.image} alt={button.text} />
                    </button>
                    {button.text}
                </div>
            ))}
        </div>
    );
};

const PageForm = () => {
    const storyState = useRecoilValue(storyAtom);
    const socket = useRecoilValue(socketAtom);
    const classes = useStyles();
    const changePageCount = (event) => {
        const value = event.target.value === 'inc' ? storyState.pageCount + 1 : storyState.pageCount - 1;
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
            <h3 style={{ style: '' }}>Page count: </h3>
            <div className={classes.pageCountWrapper}>
                <h3 className={classes.headerCount}> {storyState.pageCount} </h3>
                <div>
                    <button
                        value="inc"
                        onClick={changePageCount}
                        className={classes.pageButton}
                        style={{ backgroundColor: '#84be3a' }}
                    >
                        +
                    </button>
                    <button
                        value="dec"
                        onClick={changePageCount}
                        className={classes.pageButton}
                        style={{ backgroundColor: '#ce3432' }}
                    >
                        -
                    </button>
                </div>
            </div>
        </div>
    );
};

const Lobby = () => {
    const [storyState, setStoryState] = useRecoilState(storyAtom);
    const socket = useRecoilValue(socketAtom);
    const { joinCode } = useParams();
    const classes = useStyles();
    useEffect(() => {
        const lobbyMessageHandler = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'lobbyState') {
                setStoryState((prev) => {
                    return { ...prev, ...message.data };
                });
            }
        };
        if (socket) socket.addEventListener('message', lobbyMessageHandler);
        return () => {
            if (socket) socket.removeEventListener('message', lobbyMessageHandler);
        };
    });

    return (
        <div className={classes.root}>
            <div className={classes.paper}>
                <div className={classes.paperInside}>
                    <h1 className={classes.title}>Lobby</h1>
                    <Box className={classes.roomCode}>
                        <h1 className={classes.roomCode}>Room Code {joinCode}</h1>
                    </Box>
                    <hr className={classes.divider} />
                    <Container className={classes.boxContainer}>
                        <Box className={classes.box}>
                            <h2>Your Name: {storyState.self.name}</h2>
                            <ArtistForm isReady={storyState.self.isReady} name={storyState.self.name} />
                            <h3>Role: {Role[storyState.self.role]}</h3>
                            <RoleSelect isReady={storyState.self.isReady} selectedRole={storyState.self.role} />
                            <PageForm pageCount={storyState.pageCount} />
                        </Box>
                        <Box className={classes.box}>
                            <h2 className={classes.smallTitle}>Team</h2>
                            <List>
                                {storyState.players.map((player, index) => (
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
                                        value: !storyState.self.isReady,
                                    })
                                )
                            }
                        >
                            {storyState.self.isReady ? 'Cancel' : 'Ready'}
                        </Button>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
