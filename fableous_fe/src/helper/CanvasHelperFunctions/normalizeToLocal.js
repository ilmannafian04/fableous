const normalizeToLocal = (currentPosition, scale) => {
    return {
        x: currentPosition.x / scale,
        y: currentPosition.y / scale,
    };
};

export default normalizeToLocal;
