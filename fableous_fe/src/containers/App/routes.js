import CanvasText from '../StoryPage/canvas/CanvasText';
import StoryPage from '../StoryPage/StoryPage';
import SignUp from '../authentication/SignUp';
import SignIn from '../authentication/SignIn';
import CanvasHub from '../StoryPage/canvas/CanvasHub';
import HomePage from '../HomePage/HomePage';
import Display from '../gallery/display';

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
    {
        component: SignUp,
        exact: true,
        path: '/signup',
    },
    {
        component: SignIn,
        exact: true,
        path: '/signin',
    },
    {
        component: Display,
        exact: true,
        path: '/gallery/:id',
    },
];
