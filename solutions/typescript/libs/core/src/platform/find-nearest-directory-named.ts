import { existsSync } from 'fs';
import { join, normalize } from 'path';

export const findNearestDirectoryNamed = (
  dirname: string,
  cwd: string = process.cwd(),
): string | undefined => {
  const path = normalize(cwd);
  if (existsSync(join(path, dirname))) {
    return path;
  }

  const parent = join(path, '..');
  return parent === path ? undefined : findNearestDirectoryNamed(dirname, parent);
};
