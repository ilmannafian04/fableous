export const normalizePoint = (currentPosition, scale) => {
    return {
        x: currentPosition.x * scale,
        y: currentPosition.y * scale,
    };
};
