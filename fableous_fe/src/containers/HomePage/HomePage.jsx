import { Button, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import CustomChip from './CustomChip';
import CustomModal from './CustomModal';
import userAtom from '../../atom/userAtom';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const useStyles = makeStyles(() =>
    createStyles({
        boxWrapper: {
            width: '100vw',
            height: '100vh',
            backgroundColor: '#2E3138',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        buttonsLayout: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '2rem',
            flexDirection: 'row',
        },
        insideButton: {
            backgroundColor: '#2F3138',
            color: 'white',
            borderRadius: '50px',
        },
        bigBox: {
            display: 'flex',
            width: '930px',
            height: '417px',
            borderRadius: '46px',
            background: '#F6F1D3',
            alignItems: 'center',
            justifyContent: 'center',
        },
        smallBox: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#7030A2',
            borderRadius: '46px',
            width: '890px',
            height: '377px',
            left: '131px',
            top: '76px',
        },
        title: {
            marginTop: '1rem',
            color: '#F6F1D3',
            fontWeight: 700,
            fontSize: '90px',
            display: 'block',
            marginBlockStart: '2rem',
            marginBlockEnd: 0,
            marginInlineStart: '0px',
            marginInlineEnd: '0px',
        },
        tag: {
            color: '#F6F1D3',
            fontWeight: 500,
        },
        tagInput: {
            color: '#F6F1D3',
            fontWeight: 500,
        },
        menuButton: {
            backgroundColor: '#7030A2',
            color: 'white',
            borderRadius: '50px',
        },
        paddingLayout: {
            paddingTop: '2rem',
        },
        joinStoryDialog: {
            display: 'flex',
            backgroundColor: 'black',
        },
    })
);

const HomePage = () => {
    const classes = useStyles();
    const user = useRecoilValue(userAtom);
    const history = useHistory();

    const handleClick = (event) => {
        switch (parseInt(event.currentTarget.value)) {
            case 1:
                Axios.post('/api/createsession')
                    .then((response) => history.push(`/story/${response.data.roomCode}`))
                    .catch((error) => console.error(error));
                return;
            case 2:
                history.push('/signup');
                return;
            case 3:
                history.push('/signin');
                break;
            default:
        }
    };
    return (
        <div className={classes.boxWrapper}>
            <div className={classes.bigBox}>
                <div className={classes.smallBox}>
                    <h1 className={classes.title}>Fableous</h1>
                    <p className={classes.tag}>Tag your theme/emotions here: </p>
                    <CustomChip />
                    <div className={classes.buttonsLayout}>
                        {user.isLoggedIn ? (
                            <Button
                                size="large"
                                className={classes.insideButton}
                                onClick={handleClick}
                                name="new"
                                value={1}
                            >
                                New Story
                            </Button>
                        ) : (
                            <div>
                                <Button
                                    size="large"
                                    className={classes.insideButton}
                                    onClick={handleClick}
                                    name="new"
                                    value={2}
                                >
                                    Register
                                </Button>
                                <Button
                                    size="large"
                                    className={classes.insideButton}
                                    onClick={handleClick}
                                    name="new"
                                    value={3}
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                        <CustomModal parentClasses={classes} />
                    </div>
                </div>
            </div>
            <div className={classes.paddingLayout} />
            <div className={classes.paddingLayout} />
            <Button
                size="large"
                className={classes.menuButton}
                onClick={() => {
                    history.push('/gallery');
                }}
            >
                <span role="img" aria-labelledby="book">
                    📓
                </span>{' '}
                MY BOOKSHELF
            </Button>
        </div>
    );
};

export default HomePage;
