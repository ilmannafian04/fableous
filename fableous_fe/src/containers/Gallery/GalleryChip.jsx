import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles(() =>
    createStyles({
        chipRoot: {
            background: 'black',
            borderRadius: 29,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            disableUnderline: true,
        },
        chipInput: {
            marginLeft: 10,
            borderBottomColor: '#f6f1d3',
        },
        chip: {
            background: '#7030a2',
            color: 'black',
            marginLeft: 5,
        },
    })
);

const GalleryChip = () => {
    const classes = useStyles();
    return (
        <ChipInput
            fullWidth={true}
            classes={{
                root: classes.chipRoot,
                input: classes.chipInput,
                chip: classes.chip,
            }}
        />
    );
};

export default GalleryChip;
