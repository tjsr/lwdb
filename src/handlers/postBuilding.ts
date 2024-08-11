import { ZodError, ZodIssue, z } from 'zod';

import { MAX_LEVEL } from '../common.js';
import { StatusCodes } from 'http-status-codes';
import express from 'express';
import { jsonFromDataDir } from "../util/jsonFromDataDir.js";
import validateSession from './validateSession.js';
import validateUser from './validateUser.js';

type BuildingsPostRequest = express.Request & { params: { level?: string } };

export const buildingSchema = z.object({
  FromLevel: z.number().max(MAX_LEVEL).optional(),
  Name: z.string(),
  ToLevel: z.number().min(1).optional(),
});

const validateSubmitBuilding = (
  request: BuildingsPostRequest, response: express.Response, next: express.NextFunction
) => {
  console.debug('Validating submit building request...');
  if (!request.body) {
    response.status(400).send('Invalid building data');
    return next(new Error('Invalid building data'));
  }
  try {
    buildingSchema.parse(request.body);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: ZodIssue) => ({
        message: `${issue.path.join('.')} is ${issue.message}`,
      }));
      response.status(StatusCodes.BAD_REQUEST);
      return next({ details: errorMessages, error: 'Invalid data' });
    }
    return next(error);
  }
  next();
};

export const buildings = (request: BuildingsPostRequest, response: express.Response, next: express.NextFunction) => {
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

export default [validateSession, validateUser, validateSubmitBuilding, buildings];
