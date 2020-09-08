import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box, Container, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
        width: '80%',
        height: '80%',
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
    title: {
        fontSize: '70px',
        margin: 0,
        color: '#F6F1D3',
    },
    boxContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    box: {
        flexGrow: 1,
        textAlign: 'left',
    },
    smallTitle: {
        color: '#F6F1D3',
    },
}));

const Lobby = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.paper}>
                <div className={classes.paperInside}>
                    <h1 className={classes.title}>Lobby</h1>
                    <Container className={classes.boxContainer}>
                        <Box className={classes.box}>
                            <h2 className={classes.smallTitle}>Team</h2>
                            <List>
                                <ListItem></ListItem>
                            </List>
                        </Box>
                        <Box className={classes.box}>
                            <h2 className={classes.smallTitle}>hello</h2>
                        </Box>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
