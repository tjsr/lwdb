import express from 'express';
import { jsonFromDataDir } from '../util/jsonFromDataDir.js';
import { validateLevel } from './validateLevel.js';

type Request = express.Request & { params: { level?: string } };

export const rss = (request: Request, response: express.Response, next: express.NextFunction) => {
  console.debug('Processing RSS data...');
  let rssData = jsonFromDataDir('CrateStats', process.env['DATA_DIR'] || 'data');

  const level = request.params.level ? parseInt(request.params.level) : undefined;
  console.log('Filtering by level:', level);
  if (level) {
    rssData = rssData.filter((item: { Level: string }) => parseInt(item.Level) === level);
  }

  response.send(rssData);

  next();
};

export default [validateLevel, rss];
