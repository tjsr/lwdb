import express from 'express';
import { jsonFromDataDir } from "../util/jsonFromDataDir.js";
import { validateLevel } from "./validateLevel.js";

type BuildingsRequest = express.Request & { params: { level?: string } };

export const buildings = (request: BuildingsRequest, response: express.Response, next: express.NextFunction) => {
  console.debug('Processing RSS data...');
  let buildingData = jsonFromDataDir('BuildingUpgradeData', process.env['DATA_DIR'] || 'data');

  const level = request.params.level ? parseInt(request.params.level) : undefined;
  console.log('Filtering by level:', level);
  if (level) {
    buildingData = buildingData.filter((item: { ToLevel: string }) => parseInt(item.ToLevel) === level);
  }

  response.send(buildingData);

  next();
};

export default [validateLevel, buildings];
