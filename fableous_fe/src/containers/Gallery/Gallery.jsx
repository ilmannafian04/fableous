import React from 'react';

import GalleryAppBar from './GalleryAppBar';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChipInput from 'material-ui-chip-input';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import GalleryCard from '../../components/GalleryCard/GalleryCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '7rem',
    },
    title: {
        textAlign: 'center',
    },
    pad: {
        padding: '1rem',
    },
    cardContainer: {
        padding: '2rem 0',
    },
}));

const Gallery = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.pad}>
                <GalleryAppBar />
                <ChipInput fullWidth={true} placeholder={'Tag theme/emotion..'} alwaysShowPlaceholder={true} />
                <div className={classes.cardContainer}>
                    <Grid container spacing={4}>
                        {[
                            { text: 'Sailey and Me' },
                            { text: 'Brake my Heart' },
                            { text: 'Wheel of Fortune' },
                            { text: 'Fast & Furious 10' },
                            { text: 'Rocking Engines!' },
                        ].map((card) => (
                            <GalleryCard title={card.text} />
                        ))}
                        <Grid container justify="flex-start"></Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
