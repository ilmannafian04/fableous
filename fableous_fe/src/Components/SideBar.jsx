import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const drawerWidth = 100;
const drawerHeight = 500;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 300,
        alignItems: 'center',
        position:'absolute',
        zIndex:-1,
        backgroundColor:'red',
    },
    appBar: {
        zIndex: theme.zIndex.drawer - 1,
    },
    drawer: {
:
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        borderColor:'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor:'transparent',
        padding:0,
    },
    drawerContainer: {
        overflow: 'auto',
        padding:0,
    },
    content: {
        flexGrow: 1,
    },
    List: {
        paddingTop: '30px',
        paddingBottom: '30px',
        backgroundColor: 'lightBlue',
        borderTopRightRadius:'3%',
        borderBottomRightRadius:'3%',

    }
}));


export default function ClippedDrawer() {
    const classes = useStyles();

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
                        {['Inbox', 'Starred', 'Send email', 'Drafts','Inbox'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                {/*<ListItemText primary={text} />*/}
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
