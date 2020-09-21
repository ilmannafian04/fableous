const getMinuteFromTimeLeft = (seconds) => Math.floor(seconds / 60);

const getSecondFromTimeLeft = (seconds) => `0${seconds % 60}`.slice(-2);

export const secondsToMMSS = (seconds) => `${getMinuteFromTimeLeft(seconds)}:${getSecondFromTimeLeft(seconds)}`;
