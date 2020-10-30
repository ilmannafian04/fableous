import { Box } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import BottomBar from './GalleryComponent/BottomBar';
import GalleryAppBar from './GalleryAppBar';
import { baseUrl, httpProtocol } from '../../constant/url';

const Display = () => {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const { storyId } = useParams();
    const displayRef = useRef(null);
    const [imageSize, setImageSize] = useState({ h: 0, w: 0 });
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
    useEffect(() => {
        if (displayRef.current) {
            if (displayRef.current.parentNode.clientWidth / 16 > displayRef.current.parentNode.clientHeight / 9) {
                setImageSize({
                    h: displayRef.current.parentNode.clientHeight,
                    w: (displayRef.current.parentNode.clientHeight / 9) * 16,
                });
            } else {
                setImageSize({
                    h: (displayRef.current.parentNode.clientWidth / 16) * 9,
                    w: displayRef.current.parentNode.clientWidth,
                });
            }
        }
    }, [displayRef]);
    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <GalleryAppBar />
            <Box flexGrow={1} display="flex" alignItems="center" widht="100vw" justifyContent="center">
                <img
                    ref={displayRef}
                    src={pages.length > 0 ? `${baseUrl(httpProtocol)}${pages[currentPage].url}` : null}
                    alt="story"
                    style={{
                        width: imageSize.w,
                        height: imageSize.h,
                    }}
                />
            </Box>
            <BottomBar changeFn={changePage} page={currentPage + 1} />
        </Box>
    );
};

export default Display;
