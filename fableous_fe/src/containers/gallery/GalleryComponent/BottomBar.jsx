import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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
        top: 'auto',
        bottom: 0,
        backgroundColor: '#2F3138',
        position: 'relative',
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

export default function BottomBar({ changeFn, page }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar color="primary" className={classes.appBar}>
                <Toolbar>
                    <Button className={classes.button} name="prev" onClick={() => changeFn()}>
                        <ArrowBackIosIcon />
                        Previous Page
                    </Button>
                    <div className={classes.grow} />
                    <Button className={classes.button}>Page {page}</Button>
                    <div className={classes.grow} />
                    <Button className={classes.button} name="next" onClick={() => changeFn(true)}>
                        Next Page
                        <ArrowForwardIosIcon />
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
