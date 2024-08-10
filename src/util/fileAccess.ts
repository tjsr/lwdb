import fs, { access, stat } from 'node:fs';

export const verifyAccessOrExit = (inputFile: string): Promise<boolean> => {
  return new Promise((resolve, _reject) => {
    access(inputFile, (err) => {
      if (err?.errno == -4058) {
        console.error(`Input file ${inputFile} does not exist.`);
        process.exit(1);
      } else if (err) {
        console.error(`Unable to access input file ${inputFile}.`, err);
        process.exit(1);
      } else {
        console.debug(`Access available to file ${inputFile}`);
        resolve(true);
      }
    });
  });
};

export const verifyStatOrExit = (inputFile: string): Promise<fs.Stats> => {
  return new Promise((resolve, _reject) => {
    stat(inputFile, (err, stats) => {
      if (err) {
        const fileOrDir = stats?.isDirectory() ? 'directory' : 'file';
        console.error(`Unable to access ${fileOrDir} ${inputFile}.`, err);
        process.exit(1);
      } else {
        if (!stats?.isDirectory()) {
          console.debug(`File size: ${stats.size}`);
        }
        resolve(stats);
      }
    });
  });
};
