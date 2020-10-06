import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChipInput from 'material-ui-chip-input';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        chipInputRoot: {
            background: '#f6f1d3',
            borderRadius: 29,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            disableUnderline: true,
        },
        chipInputInput: {
            marginLeft: 10,
            borderBottomColor: '#f6f1d3',
        },
        chip: {
            background: '#7030a2',
            color: 'white',
            marginLeft: 5,
        },
    })
);

const CustomChipInput = () => {
    const classes = useStyles();
    return (
        <ChipInput
            classes={{
                root: classes.chipInputRoot,
                input: classes.chipInputInput,
                chip: classes.chip,
            }}
        />
    );
};

export default CustomChipInput;
