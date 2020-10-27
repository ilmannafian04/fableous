import CanvasText from '../CanvasText/CanvasText';
import HomePage from '../HomePage/HomePage';
import StoryPage from '../StoryPage/StoryPage';
import CanvasHub from '../CanvasHub/CanvasHub';
import Gallery from '../Gallery/Gallery';

export const routes = [
    {
        component: HomePage,
        exact: true,
        path: '/',
    },
    {
        component: StoryPage,
        exact: true,
        path: '/story/:joinCode',
    },
    {
        component: StoryPage,
        exact: true,
        path: '/story',
    },
    {
        component: CanvasText,
        exact: true,
        path: '/text',
    },
    {
        component: CanvasHub,
        exact: true,
        path: '/hub',
    },
    {
        component: Gallery,
        exact: true,
        path: '/gallery',
    },
];
