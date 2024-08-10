import express, { NextFunction, Request, Response } from "express";

export const handlers = (app: express.Express) => {
  app.get('/hello', (_request: Request, response: Response, next: NextFunction) => {
    // response.json();
    response.send({ message: 'Hello, World!' });
    next();
  });
};

export default handlers;
