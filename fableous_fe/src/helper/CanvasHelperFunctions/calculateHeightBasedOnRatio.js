import {HEIGHT_RATIO, WIDTH_RATIO} from "../../constants/ScreenRatio";

export const calculateHeightBasedOnRatio = (ref) => {
    const width = ref.offsetWidth;
    return { width: width, height: (width / WIDTH_RATIO) * HEIGHT_RATIO };
};
