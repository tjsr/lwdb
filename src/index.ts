// const { info, log, error, warn, debug } = console;

import expressSession, { MemoryStore } from 'express-session';
import { intEnv, loadEnv, requireEnv } from '@tjsr/simple-env-utils';

import { ExpressServerHelper } from '@tjsr/express-server-helper';
import { UserSessionOptions } from '@tjsr/user-session-middleware';
import express from 'express';
import fileStore from 'session-file-store';
import { getSafeTmpDir } from '@tjsr/fs-utils';
import { install as installSourceMapSupport } from 'source-map-support';
import lwdb from './handlers/index.js';
import path from 'path';
import { sourceMapsEnabled } from 'process';

// const logFunctionAsName = (callback:Function, ...args: any[]) => {
//   if (args?.length > 0 && args[0] instanceof Function) {
//     args[0] = args[0].name;
//   }
//   callback(...args);
// };

// console.info = (...args) => logFunctionAsName(info, ...args);
// console.log = (...args) => logFunctionAsName(log, ...args);
// console.warn = (...args) => logFunctionAsName(warn, ...args);
// console.error = (...args) => logFunctionAsName(error, ...args);
// console.debug = (...args) => logFunctionAsName(debug, ...args);

installSourceMapSupport();
console.log('Source maps enabled =>', sourceMapsEnabled);

const FileStoreSession = fileStore(expressSession);

if (process.env['NODE_ENV']) {
  console.log(`Starting with NODE_ENV ${process.env['NODE_ENV']}`);
  if (process.env['DOTENV_FLOW_PATTERN']) {
    console.log(`Using dotenv-flow path ${process.env['DOTENV_FLOW_PATTERN']}`);
  } else {
    process.env['DOTENV_FLOW_PATTERN'] = '.env';
  }
}
console.log(`Running on Node.js version ${process.version}`);
const DEFAULT_HTTP_PORT: number = 8646;

loadEnv();

requireEnv('SESSION_SECRET',
  'If this is not present in your .env file, you can generate a uuid using `npx uuid@9`');
requireEnv('USERID_UUID_NAMESPACE');
requireEnv('HTTP_PORT');

const storagePath: string = path.resolve(requireEnv('SESSION_STORAGE_PATH') || getSafeTmpDir());
console.debug('Storing session data in ', storagePath);

const HTTP_PORT: number = intEnv('HTTP_PORT', DEFAULT_HTTP_PORT);

interface FileSessonOptions {
  storagePath: string;
}

const sessionStore = storagePath ? new FileStoreSession({
  path: storagePath,
}) : new MemoryStore();

const sessionOptions: Partial<UserSessionOptions & FileSessonOptions> = {
  skipExposeHeaders: false,
  storagePath: storagePath,
  // use @tjsr/user-session-middleware getMysqlSessionStore() or your own implementation
  // don't use memoryStore in prod.
  store: sessionStore,
};

const expressHelper = new ExpressServerHelper({ sessionOptions });

const app: express.Express = expressHelper.init().app();

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});

lwdb(app);
