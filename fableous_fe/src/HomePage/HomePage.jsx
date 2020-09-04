import React from 'react';
import { BoxWrapper } from './style';
import CustomChip from './CustomChip';
import { Button } from '@material-ui/core';

const Home = () => {
    return (
        <BoxWrapper>
            <div className="bigBox">
                <div className="smallBox">
                    <h1 className="title">Fableous</h1>
                    <p className="tag">Tag your theme/emotions here: </p>
                    <CustomChip />
                    <div className="buttonsLayout">
                        <Button size="large" className="insideButton">
                            {' '}
                            New Story
                        </Button>
                        <Button size="large" className="insideButton">
                            {' '}
                            Join Story
                        </Button>
                    </div>
                </div>
            </div>
            <div className="padding-layout" />
            <Button size="large" className="menuButton">
                {' '}
                📚 CLASS LIBRARY
            </Button>
            <div className="padding-layout" />
            <Button size="large" className="menuButton">
                {' '}
                📓 MY BOOKSHELF
            </Button>
        </BoxWrapper>
    );
};

export default Home;
