import { NextFunction, Request, Response } from "express";

export const hello = (_request: Request, response: Response, next: NextFunction) => {
  // response.json();
  response.send({ message: 'Hello, World!' });
  next();
};

export default hello;
