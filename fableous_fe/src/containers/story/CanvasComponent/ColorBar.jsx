import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CirclePicker } from 'react-color';

const useStyles = makeStyles((Theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ColorBar({ brushColor }) {
    const classes = useStyles();
    const handleColor = (color) => {
        brushColor.setColor(color.hex);
    };
    return (
        <div className={classes.root}>
            <CirclePicker color={brushColor.color} onChangeComplete={handleColor} />
        </div>
    );
}
