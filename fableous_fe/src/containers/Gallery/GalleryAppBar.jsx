import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    appBar: {
        height: '100px',
        justifyContent: 'center',
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
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
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
                        >
                            🏠
                        </span>
                        {/*<IconButton className={classes.icon} style={{ color: '#FFFFFF' }}>*/}
                        {/*    <QuestionAnswerIcon />*/}
                        {/*</IconButton>*/}
                        {/*<IconButton className={classes.icon} style={{ color: '#FFFFFF' }}>*/}
                        {/*    <SettingsIcon />*/}
                        {/*</IconButton>*/}
                        {/*<IconButton className={classes.icon} style={{ color: '#FFFFFF' }}>*/}
                        {/*    <HomeIcon />*/}
                        {/*</IconButton>*/}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
