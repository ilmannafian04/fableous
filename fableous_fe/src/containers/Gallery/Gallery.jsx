import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

import GalleryAppBar from './GalleryAppBar';
import GalleryCard from '../../components/GalleryCard/GalleryCard';
import { baseUrl, httpProtocol } from '../../constant/url';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
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
    const [stories, setStories] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        Axios.get('/api/gallery')
            .then((response) => {
                setStories(response.data);
            })
            .catch((error) => console.error(error));
    }, []);
    return (
        <>
            <GalleryAppBar />
            <div className={classes.root}>
                <div className={classes.pad}>
                    <div className={classes.cardContainer}>
                        <Grid container spacing={4}>
                            {stories.map((card, index) => (
                                <GalleryCard
                                    title={card.title}
                                    imageURL={card.thumbnail ? `${baseUrl(httpProtocol)}${card.thumbnail}` : null}
                                    key={index}
                                    id={card.id}
                                />
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Gallery;
