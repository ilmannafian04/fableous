export const calculateHeightBasedOnRatio = (ref) => {
    if (ref.offsetWidth / 16 > ref.offsetHeight / 9) {
        return {
            height: ref.offsetHeight,
            width: (ref.offsetHeight / 9) * 16,
        };
    } else {
        return {
            height: (ref.offsetWidth / 16) * 9,
            width: ref.offsetWidth,
        };
    }
};
