import { HEIGHT_RATIO, WIDTH_RATIO } from '../../constant/ScreenRatio';

export const calculateHeightBasedOnRatio = (ref) => {
    const width = ref.offsetWidth;
    const height = ref.offsetHeight;
    // if (ref.offsetWidth / 16 > ref.offsetHeight/ 9) {
    //     return{
    //         height: ref.offsetHeight,
    //         width: (ref.offsetHeight / 9) * 16,
    //     };
    // } else {
    //     return {
    //         height: (ref.offsetWidth / 16) * 9,
    //         width: ref.offsetWidth,
    //     };
    // }
    return { width: width, height: (width / WIDTH_RATIO) * HEIGHT_RATIO };
};
