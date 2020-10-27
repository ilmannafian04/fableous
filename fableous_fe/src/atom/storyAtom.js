import { atom } from 'recoil';

const storyAtom = atom({
    key: 'story',
    default: {
        state: 0,
        pageCount: 2,
        self: {
            name: 'Fableous #0000',
            role: 0,
            isReady: false,
        },
        players: [],
    },
});

export default storyAtom;
