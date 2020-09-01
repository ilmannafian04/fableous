import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import { Home } from '@material-ui/icons';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        height: '100px',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 'inherit',
    },
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar} style={{ backgroundColor: '#2F3138' }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" className={classes.title} align={'left'}>
                        Crabbing In the Disco
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton className={classes.icon} style={{ color: '#FFFFFF' }}>
                                <QuestionAnswerIcon />
                            </IconButton>
                            <IconButton className={classes.icon} style={{ color: '#FFFFFF' }}>
                                <SettingsIcon />
                            </IconButton>
                            <IconButton className={classes.icon} style={{ color: '#FFFFFF' }}>
                                <HomeIcon />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
