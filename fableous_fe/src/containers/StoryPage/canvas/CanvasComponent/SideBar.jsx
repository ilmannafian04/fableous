import { Icon } from '@iconify/react';
import eraserIcon from '@iconify/icons-mdi/eraser';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BrushIcon from '@material-ui/icons/Brush';
import TitleIcon from '@material-ui/icons/Title';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import React, { useState } from 'react';

import Toolbrush from './Toolbrush';

const drawerWidth = 100;

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
        display: 'flex',
        backgroundColor: '#7030A2',
        borderTopRightRadius: '3%',
        borderBottomRightRadius: '3%',
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    icons: {
        color: 'black',
        backgroundColor: 'white',
        height: '48px',
        width: '48px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '20%',
    },
}));

export default function ClippedDrawer({ brushColor, erase, brushSize }) {
    const classes = useStyles();

    const [isOpen, setOpen] = useState(false);
    const clickHandler = () => {
        setOpen(true);
        erase.setMode('brush');
    };

    const eraserHandler = () => {
        erase.setMode('eraser');
        brushSize(15);
    };

    return (
        <div className={classes.root}>
            {isOpen ? <Toolbrush brushSize={brushSize} brushColor={brushColor} closeDrawer={setOpen} /> : null}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                    <List className={classes.List}>
                        <ListItem button onClick={clickHandler}>
                            <ListItemIcon>
                                <BrushIcon className={classes.icons} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button onClick={eraserHandler}>
                            <ListItemIcon>
                                <Icon icon={eraserIcon} className={classes.icons} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <TitleIcon className={classes.icons} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <VolumeUpIcon className={classes.icons} />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
