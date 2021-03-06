import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import userAtom from '../../atom/userAtom';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#2E3138',
        },
        paper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70%',
            height: '70%',
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
        input: {
            backgroundColor: '#FFF',
            borderRadius: '5px',
            marginBottom: '5px',
        },
        formWrapper: {
            display: 'flex',
            flexDirection: 'column',
        },
        inputWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
        },
        title: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1rem',
        },
    })
);

export const SignIn = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [user, setUser] = useRecoilState(userAtom);
    const history = useHistory();
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
                window.localStorage.setItem('fableousAccessToken', response.data['access']);
                window.localStorage.setItem('fableousRefreshToken', response.data['refresh']);
                setUser((previous) => {
                    return { ...previous, isLoggedIn: true };
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (user.isLoggedIn) {
            history.push('/');
        }
    }, [user, history]);

    return (
        <div className={classes.root}>
            <div className={classes.paper}>
                <div className={classes.paperInside}>
                    <div className={classes.content}>
                        <div className={classes.title}>
                            <Typography variant={'h3'} style={{ color: '#F6F1D3', fontWeight: 700 }}>
                                Fableous
                            </Typography>
                            <Typography variant={'h5'} style={{ color: '#F6F1D3', fontWeight: 500 }}>
                                Sign in
                            </Typography>
                        </div>
                        <div className={classes.inputWrapper}>
                            <form onSubmit={submitHandler} className={classes.formWrapper}>
                                <TextField
                                    className={classes.input}
                                    variant="filled"
                                    type="text"
                                    label="username"
                                    name="username"
                                    onChange={changeHandler}
                                />
                                <TextField
                                    className={classes.input}
                                    variant="filled"
                                    type="password"
                                    label="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <Button type={'submit'} variant="contained" color="primary">
                                    Sign In
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
