import buildings from "./buildings.js";
import express from "express";
import hello from "./hello.js";
import postBuilding from "./postBuilding.js";
import research from "./research.js";
import rss from "./rss.js";

export const handlers = (app: express.Express) => {
  app.get('/hello', hello);
  app.get('/rss/:level?', rss);
  app.get('/buildings/:level?', buildings);
  app.post('/buildings', postBuilding);
  app.get('/research/:tree?', research);
  app.use((
    error: Error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    console.warn('Got error in request: ', error);
    if (response.statusCode === 200) {
      response.status(500);
    }
    response.end();
  });
};

export default handlers;
