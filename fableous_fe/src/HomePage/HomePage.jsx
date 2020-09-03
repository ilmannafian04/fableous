import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { BoxWrapper } from './style';
import CustomChip from './CustomChip';

const styles = {
    chipInputRoot: {
        color: '#f6f1d3',
        borderRadius: 29,
    },
    chip: {
        background: '#7030A2',
    },
};

const Home = () => {
    return (
        <BoxWrapper>
            <div className="bigBox">
                <div className="smallBox">
                    <h1 className="title">Fabelous</h1>
                    <p className="tag">Tag your theme/emotions here </p>
                    <CustomChip />
                </div>
            </div>
        </BoxWrapper>
    );
};

export default withStyles(styles)(Home);
