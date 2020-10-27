import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
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

export default function BottomBar() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar color="primary" className={classes.appBar}>
                <Toolbar>
                    <Button className={classes.button} name="prev">
                        <IconButton color="inherit">
                            <ArrowBackIosIcon />
                        </IconButton>
                        Previous Page
                    </Button>
                    <div className={classes.grow} />
                    <Button className={classes.button}>Page </Button>
                    <div className={classes.grow} />
                    <Button className={classes.button} name="next">
                        Next Page
                        <IconButton color="inherit">
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
