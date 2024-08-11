import { express } from '@tjsr/user-session-middleware';

const validateUser = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  if (!request.session.userId) {
    response.status(401).send('Unauthorized');
    return next(new Error('Unauthorized'));
  }
  return next();
};

export default validateUser;
