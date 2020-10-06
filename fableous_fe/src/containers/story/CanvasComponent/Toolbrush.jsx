import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ColorBar from './ColorBar';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#7030A2',
        paddingTop: '1rem',
        paddingLeft: '1rem',
        paddingBottom: '1rem',
        paddingRight: '1rem',
    },
}));

export default function Toolbrush() {
    const classes = useStyles();

    const [brushSize, setBrushSize] = useState(15);

    return (
        <div className={classes.root}>
            <ColorBar />
            <button
                onClick={() => {
                    setBrushSize(5);
                }}
            >
                Small
            </button>
            <button
                onClick={() => {
                    setBrushSize(15);
                }}
            >
                Medium
            </button>
            <button
                onClick={() => {
                    setBrushSize(30);
                }}
            >
                Large
            </button>
            <ListItem button>
                <CloseIcon />
            </ListItem>
        </div>
    );
}
