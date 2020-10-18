import CanvasText from '../StoryPage/canvas/CanvasText';
import HomePage from '../HomePage/HomePage';
import StoryPage from '../StoryPage/StoryPage';
import CanvasHub from '../StoryPage/canvas/CanvasHub';
import Canvas from '../StoryPage/canvas/Canvas';

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
        component: Canvas,
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
];
