import { atom } from 'recoil';

const userAtom = atom({
    key: 'isLoggedin',
    default: { isLoggedIn: false, user: null },
});

export default userAtom;
