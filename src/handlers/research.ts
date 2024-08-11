import express from 'express';
import { jsonFromDataDir } from '../util/jsonFromDataDir.js';

type ResearchRequest = express.Request & { params: { tree?: string } };

const removeSpaces = (str: string) => str.replace(/\s/g, '');

export const validateTree = (request: ResearchRequest, response: express.Response, next: express.NextFunction) => {
  if (request.params.tree === undefined) {
    response.status(400);
  }
  next();
};

export const research = (request: ResearchRequest, response: express.Response, next: express.NextFunction) => {
  console.debug('Processing RSS data...');
  let researchData = jsonFromDataDir('ResearchUpgradeData', process.env['DATA_DIR'] || 'data');

  if (request.params.tree) {
    console.debug('Filtering by tech tree:', request.params.tree);
    researchData = researchData.filter((item: { Tree: string }) => removeSpaces(item.Tree) === request.params.tree);
  }

  response.send(researchData);

  next();
};

export default [validateTree, research];
