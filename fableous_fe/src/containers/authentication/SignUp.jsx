import React, { useState } from 'react';
import Axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

export const SignUp = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const changeHandler = (event) => {
        const target = event.target;
        switch (target.name) {
            case 'username':
                setFormState({ ...formState, username: target.value });
                break;
            case 'email':
                setFormState({ ...formState, email: target.value });
                break;
            case 'password':
                setFormState({ ...formState, password: target.value });
                break;
            default:
        }
    };
    const submitHandler = (event) => {
        event.preventDefault();
        Axios.post('/api/signup', new FormData(event.currentTarget))
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.config);
                console.error(error);
            });
    };
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
                                Sign Up
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
                                    type="text"
                                    label="email"
                                    name="email"
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
                                    Sign Up
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
