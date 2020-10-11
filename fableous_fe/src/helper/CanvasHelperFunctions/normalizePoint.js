import {DEFAULT_WIDTH_CANVAS} from "../../constants/ScreenRatio";

export const normalizePoint = (currentPosition, scale, ref) => {
    if (ref.offsetWidth < DEFAULT_WIDTH_CANVAS) {
        return {
            x: currentPosition.x * scale,
            y: currentPosition.y * scale,
        };
    } else {
        return {
            x: currentPosition.x / scale,
            y: currentPosition.y / scale,
        };
    }
};
