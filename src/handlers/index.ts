import express from "express";
import hello from "./hello.js";
import rss from "./rss.js";

export const handlers = (app: express.Express) => {
  app.get('/hello', hello);
  app.get('/rss', rss);
};

export default handlers;
