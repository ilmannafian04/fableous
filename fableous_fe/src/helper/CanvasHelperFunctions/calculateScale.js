import { DEFAULT_CANVAS_SIZE } from '../../constant/ScreenRatio';

export const calculateScale = (ref) => {
    if (ref.offsetHeight / 9 > ref.offsetWidth / 16) {
        return DEFAULT_CANVAS_SIZE.width / ref.offsetWidth;
    } else {
        return DEFAULT_CANVAS_SIZE.height / ref.offsetHeight;
    }
};

export const calculateScaleHub = (ref) => {
    if (ref.offsetHeight / 9 > ref.offsetWidth / 16) {
        return ref.offsetWidth / DEFAULT_CANVAS_SIZE.width;
    } else {
        return ref.offsetHeight / DEFAULT_CANVAS_SIZE.height;
    }
};
