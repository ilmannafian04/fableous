import React from 'react';

import GalleryAppBar from './GalleryAppBar';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChipInput from 'material-ui-chip-input';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '7rem',
    },
    title: {
        textAlign: 'center',
    },
}));

const Gallery = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <GalleryAppBar />
            <ChipInput fullWidth={true} placeholder={'Tag theme/emotion..'} alwaysShowPlaceholder={true} />

            <div>
                <Grid container spacing={4}>
                    {[
                        { text: 'Sailey and Me' },
                        { text: 'Brake my Heart' },
                        { text: 'Wheel of Fortune' },
                        { text: 'Fast & Furious 10' },
                        { text: 'Rocking Engines!' },
                    ].map((card) => (
                        <Grid item xs={6} sm={3}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {card.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    <Grid container justify="flex-start"></Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Gallery;
