import CanvasText from '../CanvasText/CanvasText';
import HomePage from '../HomePage/HomePage';
import StoryPage from '../StoryPage/StoryPage'

export const routes = [
    {
        component: HomePage,
        exact: true,
        path: "/",
    },
    {
        component: StoryPage,
        exact: true,
        path: "/story/:joinCode",
    },
    {
        component: StoryPage,
        exact: true,
        path: "/story",
    },
    {
        component:CanvasText,
        exact: true,
        path:"/text"
    }
]
