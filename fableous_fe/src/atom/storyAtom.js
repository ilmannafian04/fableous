import { atom } from 'recoil';

export const storyDefault = {
    state: 0,
    pageCount: 2,
    self: {
        name: 'Fableous #0000',
        role: 0,
        isReady: false,
    },
    players: [],
    timeLeft: 0,
    currentPage: 0,
};

const storyAtom = atom({
    key: 'story',
    default: storyDefault,
});

export default storyAtom;
