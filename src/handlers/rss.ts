import { NextFunction, Request, Response } from 'express';

import fs from 'node:fs';
import path from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataCache: Map<string, any> = new Map();

const jsonFromDataDir = (dataFile: string, dataDir = 'data') => {
  if (dataCache.has(dataFile)) {
    return dataCache.get(dataFile);
  }
  const dataPath = path.join(__dirname, '..', dataDir, `${dataFile}.json`);
  const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  dataCache.set(dataFile, jsonData);
  return jsonData;
};

export const rss = (_request: Request, response: Response, next: NextFunction) => {
  const rssData = jsonFromDataDir('CrateStats');
  response.json();
  response.send(rssData);

  next();
};

export default rss;
