import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Toolbrush from './Toolbrush';

import { Icon } from '@iconify/react';
import mousePointer from '@iconify/icons-fa-solid/mouse-pointer';
import eraserIcon from '@iconify/icons-mdi/eraser';
import BrushIcon from '@material-ui/icons/Brush';
import TitleIcon from '@material-ui/icons/Title';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 100;
const drawerHeight = 500;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 300,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer - 1,
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        borderColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        padding: 0,
    },
    drawerContainer: {
        overflow: 'auto',
        padding: 0,
    },
    content: {
        flexGrow: 1,
    },
    List: {
        paddingTop: '150px',
        paddingBottom: '150px',
        backgroundColor: '#7030A2',
        borderTopRightRadius: '3%',
        borderBottomRightRadius: '3%',
        height: 500,
        justifyContent: 'center',
    },
    openBrush: {
        backgroundColor: 'blue',
    },
    closeBrush: {
        backgroundColor: 'red',
    },
}));

export default function ClippedDrawer() {
    const classes = useStyles();

    const [isOpen, setOpen] = useState(false);
    const onClick = () => setOpen(true);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                    <List className={classes.List}>
                        <ListItem button>
                            <ListItemIcon>
                                <Icon icon={mousePointer} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button onClick={onClick}>
                            <ListItemIcon>
                                <BrushIcon />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Icon icon={eraserIcon} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <TitleIcon />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <VolumeUpIcon />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            {isOpen ? <Toolbrush /> : null};
        </div>
    );
}
