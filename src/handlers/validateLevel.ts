import express, { NextFunction } from 'express';

import { MAX_LEVEL } from '../common.js';

type Request = express.Request & { params: { level?: string } };

export const validateLevel = (request: Request, response: express.Response, next: NextFunction) => {
  console.debug(validateLevel, 'Validating level:', request.params.level);
  const level = request.params.level ? parseInt(request.params.level) : undefined;
  if (level == undefined) {
    return next();
  }
  if (level > MAX_LEVEL || level < 1) {
    console.error('Invalid level:', level);
    response.status(400);
    return next(new Error('Invalid level'));
  }
  next();
};
