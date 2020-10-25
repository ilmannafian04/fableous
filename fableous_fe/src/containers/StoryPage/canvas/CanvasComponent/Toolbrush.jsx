import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

import ColorBar from './ColorBar';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        backgroundColor: '#7030A2',
        paddingTop: '1rem',
        paddingLeft: '1rem',
        paddingBottom: '1rem',
        paddingRight: '1rem',
        flexDirection: 'column',
    },
    padding: {
        paddingTop: '1rem',
    },
}));

export default function Toolbrush({ brushColor, closeDrawer, brushSize }) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <CloseIcon button onClick={() => closeDrawer(false)} />
                <ColorBar brushColor={brushColor} />
                <div className={classes.padding} />
                <button
                    onClick={() => {
                        brushSize(5);
                    }}
                >
                    Small
                </button>
                <button
                    onClick={() => {
                        brushSize(15);
                    }}
                >
                    Medium
                </button>
                <button
                    onClick={() => {
                        brushSize(30);
                    }}
                >
                    Large
                </button>
            </div>
        </div>
    );
}
