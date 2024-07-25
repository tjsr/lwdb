import { intEnv, loadEnv, requireEnv } from '@tjsr/simple-env-utils';

import { ExpressServerHelper } from '@tjsr/express-server-helper';
import { MemoryStore } from 'express-session';
import { UserSessionOptions } from '@tjsr/user-session-middleware';
import express from 'express';

console.log(`Starting with NODE_ENV ${process.env['NODE_ENV']}`);
const DEFAULT_HTTP_PORT: number = 8343;

loadEnv();

requireEnv('SESSION_SECRET');
requireEnv('USERID_UUID_NAMESPACE');
requireEnv('HTTP_PORT');

const HTTP_PORT: number = intEnv('HTTP_PORT', DEFAULT_HTTP_PORT);

const sessionOptions: Partial<UserSessionOptions> = {
  skipExposeHeaders: false,
  // use @tjsr/user-session-middleware getMysqlSessionStore() or your own implementation
  // don't use memoryStore in prod.
  store: new MemoryStore(),
};

const expressHelper = new ExpressServerHelper({ sessionOptions });

const app: express.Express = expressHelper.init().app();

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});
