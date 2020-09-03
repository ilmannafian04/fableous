import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ChipInput from 'material-ui-chip-input';

const styles = {
    chipInputRoot: {
        background: '#f6f1d3',
        borderRadius: 29,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
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
};

class CustomChipInput extends React.Component {
    render() {
        const { classes, ...other } = this.props;

        return (
            <ChipInput
                classes={{
                    root: classes.chipInputRoot,
                    input: classes.chipInputInput,
                    chip: classes.chip,
                }}
            />
        );
    }
}

export default withStyles(styles)(CustomChipInput);
