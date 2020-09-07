import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JoinStory = () => {
    const [roomCode, setRoomCode] = useState('');
    const changeHandler = (event) => {
        if (/^[a-zA-Z]*$/.test(event.target.value) && event.target.value.length <= 5) {
            setRoomCode(event.target.value.toUpperCase());
        }
    };
    return (
        <div>
            <form>
                <input onChange={changeHandler} value={roomCode} />
            </form>
            <Link to={`/story/${roomCode}`}>
                <button disabled={roomCode.length !== 5}>Join</button>
            </Link>
        </div>
    );
};

const Landing = () => {
    return (
        <div>
            <h1>Fableous</h1>
            <Link to={`/story`}>
                <button>New</button>
            </Link>
            <JoinStory />
        </div>
    );
};

export default Landing;
