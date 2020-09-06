import React, { useEffect, useState } from 'react';
import Role from '../../constant/role';

const nameValidator = (name) => {
    let isValid = true;
    if (name.length < 1) isValid = false;
    return isValid;
};

const ArtistForm = ({ socket, isReady, name }) => {
    const [newName, setNewName] = useState('Fableous');
    useEffect(() => {
        setNewName(name);
    }, [name]);
    const submitHandler = (event) => {
        event.preventDefault();
        if (socket) {
            socket.send(JSON.stringify({ command: 'draw.lobby.name', name: newName }));
        }
    };
    return (
        <form onSubmit={submitHandler}>
            <input
                name="name"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                disabled={isReady}
            />
            <button type="submit" disabled={(!nameValidator(newName) && socket) || isReady || name === newName}>
                Set
            </button>
        </form>
    );
};

const RoleSelect = ({ socket, isReady, selectedRole }) => {
    const clickHandler = (event) => {
        if (socket) {
            socket.send(JSON.stringify({ command: 'draw.lobby.role', role: event.target.value }));
        }
    };
    return (
        <div>
            <h4>Role</h4>
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

const Lobby = ({ socket, roomCode, changeState }) => {
    const [lobbyState, setLobbyState] = useState({ players: [], self: { name: 'Fableous', role: 0, isReady: false } });
    if (socket) {
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message['state'] === 0) {
                delete message['state'];
                setLobbyState(message);
            } else {
                changeState(message['state']);
            }
        };
    }
    return (
        <div>
            <h1>{roomCode}</h1>
            <ArtistForm socket={socket} isReady={lobbyState.self.isReady} name={lobbyState.self.name} />
            <RoleSelect socket={socket} isReady={lobbyState.self.isReady} selectedRole={lobbyState.self.role} />
            <h4>Team</h4>
            <ul>
                {lobbyState.players.map((player, index) => (
                    <li key={index}>
                        {player.name} - {player.role ? Role[player.role] : 'Selecting role'} -{' '}
                        {player.isReady ? 'Ready' : 'Not ready'}
                    </li>
                ))}
            </ul>
            <button
                onClick={() =>
                    socket.send(JSON.stringify({ command: 'draw.lobby.isReady', isReady: !lobbyState.self.isReady }))
                }
            >
                {lobbyState.self.isReady ? 'Cancel' : 'Ready'}
            </button>
        </div>
    );
};

export default Lobby;
