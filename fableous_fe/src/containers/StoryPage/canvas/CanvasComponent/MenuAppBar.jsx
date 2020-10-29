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
import Role from '../../../../constant/role';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100px',
        width: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    appBar: {
        width: '100%',
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
            <AppBar className={classes.appBar} position="sticky">
                <Toolbar>
                    <Typography variant="h4" className={classes.title} align={'left'}>
                        Role: {Role[storyState.self.role]}
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
