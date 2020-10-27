import React, { useEffect, useState } from 'react';
import BottomBar from './GalleryComponent/BottomBar';
import { makeStyles } from '@material-ui/core/styles';
import GalleryAppBar from './GalleryAppBar';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl, httpProtocol } from '../../constant/url';

const useStyles = makeStyles(() => ({
    background: {
        backgroundColor: '#7030A2',
        height: '100vh',
        width: '100vw',
        overflowY: 'scroll',
    },
    content: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: '100%',
        width: '100%',
        objectFit: 'scale-down',
    },
    imgWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const Display = () => {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const classes = useStyles();
    const { storyId } = useParams();
    useEffect(() => {
        Axios.get(`/api/gallery?id=${storyId}`).then((response) => {
            setPages(response.data.pages);
        });
    }, [storyId]);
    const changePage = (increment) => {
        let next = increment ? currentPage + 1 : currentPage - 1;
        if (next + 1 > pages.length) {
            next = pages.length - 1;
        } else if (next < 0) {
            next = 0;
        }
        setCurrentPage(next);
    };
    return (
        <div className={classes.background}>
            <GalleryAppBar />
            <div className={classes.content}>
                <img
                    className={classes.img}
                    src={pages.length > 0 ? `${baseUrl(httpProtocol)}${pages[currentPage].url}` : null}
                    alt="story"
                />
            </div>
            <BottomBar changeFn={changePage} page={currentPage + 1} />
        </div>
    );
};

export default Display;
