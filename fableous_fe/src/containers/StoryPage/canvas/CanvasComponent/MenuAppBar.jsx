import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import storyAtom from '../../../../atom/storyAtom';
import { secondsToMMSS } from '../../../../utils/formatting';

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
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const history = useHistory();
    const storyState = useRecoilValue(storyAtom);

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h4" className={classes.title} align={'left'}>
                        Crabbing In the Disco
                    </Typography>
                    <Typography>Time: {secondsToMMSS(storyState.timeLeft)}</Typography>
                    <div>
                        <IconButton
                            className={classes.icon}
                            style={{ color: '#FFFFFF' }}
                            onClick={() => history.push('/')}
                        >
                            <HomeIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
