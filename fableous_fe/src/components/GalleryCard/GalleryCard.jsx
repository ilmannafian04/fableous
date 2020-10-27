import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { CardMedia } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Test from '../../assets/test(2).png';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 345,
    },
    title: {
        textAlign: 'center',
    },
    pad: {
        padding: '1rem',
    },
    media: {
        height: 140,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}));

const GalleryCard = ({ title, imageURL, id }) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Grid item xs={6} sm={3}>
            <Card
                className={classes.root}
                onClick={() => {
                    history.push(`/gallery/${id}`);
                }}
            >
                <CardActionArea>
                    <CardMedia className={classes.media}>
                        <img className={classes.image} src={imageURL ? imageURL : Test} alt={title} />
                    </CardMedia>
                    <CardContent>
                        <Typography
                            className={classes.title}
                            color="textPrimary"
                            gutterBottom
                            variant="h6"
                            component="h3"
                        >
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default GalleryCard;
