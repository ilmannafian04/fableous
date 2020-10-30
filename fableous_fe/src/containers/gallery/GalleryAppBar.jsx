import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    appBar: {
        backgroundColor: '#2F3138',
    },
    icon: {
        fontSize: 'inherit',
    },
    button: {
        fontSize: '36px',
    },
}));

export default function GalleryAppBar() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <AppBar className={classes.appBar} position="sticky">
            <Toolbar>
                <Typography variant="h4" className={classes.title} align={'left'}>
                    My Bookshelf
                </Typography>
                <div className={classes.button}>
                    <span
                        role="img"
                        aria-label="emoji"
                        onClick={() => {
                            history.push('/');
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        🏠
                    </span>
                </div>
            </Toolbar>
        </AppBar>
    );
}
