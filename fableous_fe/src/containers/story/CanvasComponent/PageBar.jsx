import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
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
        height: '100px',
        justifyContent: 'center',
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    button: {
        backgroundColor: '#CACACA',
        '&:hover': {
            backgroundColor: '#FFFFFF',
        },
        width: 150,
    },
}));

export default function BottomAppBar(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" color="primary" className={classes.appBar} style={{ backgroundColor: '#2F3138' }}>
                <Toolbar>
                    <Button className={classes.button}>
                        <IconButton color="inherit">
                            <ArrowBackIosIcon />
                        </IconButton>
                        Previous Page
                    </Button>
                    <div className={classes.grow} />
                    <Button className={classes.button}>Page {props.page}</Button>
                    <div className={classes.grow} />
                    <Button className={classes.button}>
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
