import path from 'node:path';
import { stripFileExtension } from '@tjsr/fs-utils';

export const worksheetOutputFilenameForTarget = (
  worksheetName: string, targetPath: string, isDirectory: boolean, extension: string = 'csv'
): string => {
  if (isDirectory) {
    return path.join(targetPath, `${worksheetName}.${extension}`);
  } else {
    return `${stripFileExtension(targetPath)}-${worksheetName}.${extension}`;
  }
};
