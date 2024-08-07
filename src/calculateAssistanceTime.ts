const MINIMUM_PERCENTAGE = 0.005000;

export const calculateAssistanceTime = (seconds: number, minimumSeconds: number): number => {
  if (minimumSeconds > seconds) {
    return seconds;
  }
  const percentageSeconds = Math.floor(seconds * MINIMUM_PERCENTAGE);

  return percentageSeconds < minimumSeconds ? minimumSeconds : percentageSeconds;
};

export const getAssistedTime = (seconds: number, minimumSeconds: number, rounds = 1): number => {
  const assistedTime: number = Math.floor(seconds * MINIMUM_PERCENTAGE);
  let remainingTime: number = seconds - assistedTime;

  if (assistedTime <= minimumSeconds) {
    remainingTime = seconds - minimumSeconds;
  }
  if (remainingTime <= 0) {
    return 0;
  }
  if (rounds == 1) {
    return remainingTime;
  }
  return getAssistedTime(remainingTime, minimumSeconds, rounds - 1);
};
