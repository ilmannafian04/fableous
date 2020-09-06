import {DEFAULT_WIDTH_CANVAS} from "../../constants/ScreenRatio";

export const calculateScale = (ref) => {
    let parentWidth = ref.offsetWidth;
    const numerator = parentWidth > DEFAULT_WIDTH_CANVAS ? parentWidth : DEFAULT_WIDTH_CANVAS;
    const denominator = parentWidth > DEFAULT_WIDTH_CANVAS ? DEFAULT_WIDTH_CANVAS : parentWidth;
    return numerator / denominator
}
