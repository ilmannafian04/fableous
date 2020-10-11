import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CirclePicker } from 'react-color';

const useStyles = makeStyles((Theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ColorBar() {
    const classes = useStyles();
    const [color, setColor] = useState('#000000');
    return (
        <div className={classes.root}>
            <CirclePicker
                color={color}
                onChangeComplete={(color) => {
                    setColor(color.hex);
                }}
            />
        </div>
    );
}
