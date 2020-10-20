import React, { useState } from 'react';
import Axios from 'axios';

export const SignIn = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const changeHandler = (event) => {
        const target = event.target;
        switch (target.name) {
            case 'username':
                setFormState({ ...formState, username: target.value });
                break;
            case 'password':
                setFormState({ ...formState, password: target.value });
                break;
            default:
        }
    };
    const submitHandler = (event) => {
        event.preventDefault();
        Axios.post('/api/token/', new FormData(event.currentTarget))
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <form onSubmit={submitHandler}>
            <input type="text" name="username" onChange={changeHandler} />
            <input type="password" name="password" onChange={changeHandler} />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;
