const parseIntOrDefault = (value: string, defaultValue: number): number => {
  if (undefined === value || "" === value) {
    return 0;
  }
  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
};

export type days = number;
export type hours = number;
export type minutes = number;
export type seconds = number;

export type TimeParts = [days, hours, minutes, seconds];

export const sanitizeTimeString = (inputString: string): string => {
  let sanitized = inputString ?? "";
  sanitized = sanitized?.trim();
  sanitized = sanitized.replace(/\D/g, ":");
  while (sanitized.includes("::")) {
    sanitized = sanitized.replace(/::/g, ":");
  } 
  while (sanitized.startsWith(":")) {
    sanitized = sanitized.slice(1);
  }
  while (sanitized.endsWith(":")) {
    sanitized = sanitized.slice(0, -1);
  }
  return sanitized;
};

export const splitTimeStringToParts = (timeString: string): TimeParts => {
  const safeTimeString = timeString.replace(/[ :^\d]/g, ":");
  const timeParts = safeTimeString.split(":").map((part) => parseIntOrDefault(part, 0) ?? 0);

  while (timeParts.length < 4) {
    timeParts.unshift(0);
  }
  const requiredOffset = 4 - timeParts.length;

  const indexes = [0, 1, 2, 3].map((index) => index - requiredOffset);
  const timePartsMap = indexes.map((index) => index < 0 ? 0 : timeParts[index]);
  return timePartsMap as TimeParts;
};

export const timePartsAsSeconds = (timeParts: TimeParts): seconds => {
  const [days, hours, minutes, seconds] = timeParts;
  let outputSeconds = 0;
  outputSeconds += (days ?? 0) * 24 * 60 * 60;
  outputSeconds += (hours ?? 0) * 60 * 60;
  outputSeconds += (minutes ?? 0) * 60;
  outputSeconds += seconds ?? 0;
  return outputSeconds;
};

export const timeToSeconds = (time: string): seconds => {
  const timeAsParts: TimeParts = splitTimeStringToParts(time);
  const outputSeconds = timePartsAsSeconds(timeAsParts);
  return outputSeconds;
};
