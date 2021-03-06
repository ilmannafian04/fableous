import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import React from 'react';
import { useRecoilValue } from 'recoil';

import storyAtom from '../../../../atom/storyAtom';

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        width: '100%',
        // height: '100px',
        backgroundColor: '#2F3138',
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        backgroundColor: '#CACACA',
        '&:hover': {
            backgroundColor: '#FFFFFF',
        },
        width: 150,
    },
}));

export default function BottomAppBar() {
    const storyState = useRecoilValue(storyAtom);
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar color="primary" className={classes.appBar} position="sticky">
                <Toolbar>
                    <div className={classes.grow} />
                    <Button className={classes.button}>Page {storyState.currentPage}</Button>
                    <div className={classes.grow} />
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
