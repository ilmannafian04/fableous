import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { CirclePicker } from 'react-color';

const useStyles = makeStyles(() => ({
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
