import fs from 'node:fs';
import path from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataCache: Map<string, any> = new Map();

export const jsonFromDataDir = (dataFile: string, dataDir = 'data') => {
  if (dataCache.has(dataFile)) {
    return dataCache.get(dataFile);
  }
  const dataPath = path.join(dataDir, `${dataFile}.json`);
  const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  dataCache.set(dataFile, jsonData);
  return jsonData;
};
