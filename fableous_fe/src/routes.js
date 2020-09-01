import Home from '../src/Home/HomePage';
import AudioRecorder from './VoiceRecorder';
import DrawPage from './DrawPage/DrawPage';

export const routes = [
    {
        component: Home,
        exact: true,
        path: '/',
    },
    {
        component: DrawPage,
        exact: true,
        path: '/draw',
    },
    {
        component: AudioRecorder,
        exact: true,
        path: '/record',
    },
];
