import { express } from '@tjsr/user-session-middleware';

const validateSession = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  if (!request.session) {
    response.status(401).send('Unauthorized');
    return next(new Error('Unauthorized'));
  }
  return next();
};

export default validateSession;
