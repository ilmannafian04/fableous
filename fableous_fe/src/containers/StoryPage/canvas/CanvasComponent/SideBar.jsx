import { Icon } from '@iconify/react';
import eraserIcon from '@iconify/icons-mdi/eraser';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BrushIcon from '@material-ui/icons/Brush';
import TitleIcon from '@material-ui/icons/Title';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import React, { useState } from 'react';
import Toolbrush from './Toolbrush';
import storyAtom from '../../../../atom/storyAtom';
import { useRecoilValue } from 'recoil';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer - 1,
    },
    drawer: {
        flexShrink: 0,
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
        justifyContent: 'center',
        maxHeight: '50%',
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
    sidebarWrapper: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999,
    },
    iconWrapper: {
        display: 'flex',
    },
}));

export default function ClippedDrawer({ brushColor, erase, brushSize, createTextNode }) {
    const classes = useStyles();

    const [isOpen, setOpen] = useState(false);
    const user = useRecoilValue(storyAtom);
    const clickHandler = () => {
        setOpen(true);
        erase.setMode('brush');
    };

    const eraserHandler = () => {
        erase.setMode('eraser');
        brushSize(15);
    };

    return (
        <div className={classes.sidebarWrapper}>
            <div className={classes.iconWrapper}>
                <List className={classes.List}>
                    {user.self.role !== 3 ? (
                        <div>
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
                                    <TitleIcon className={classes.icons} onClick={() => createTextNode()} />
                                </ListItemIcon>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <VolumeUpIcon className={classes.icons} />
                                </ListItemIcon>
                            </ListItem>
                        </div>
                    ) : (
                        <div>
                            <ListItem button>
                                <ListItemIcon>
                                    <TitleIcon className={classes.icons} onClick={() => createTextNode()} />
                                </ListItemIcon>
                            </ListItem>
                        </div>
                    )}
                </List>
                {isOpen ? <Toolbrush brushSize={brushSize} brushColor={brushColor} closeDrawer={setOpen} /> : null}
            </div>
        </div>
    );
}
