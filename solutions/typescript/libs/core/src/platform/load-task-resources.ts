import { promises as fs } from 'fs';
import { join } from 'path';
import { findNearestDirectoryNamed } from './find-nearest-directory-named';
import { TaskMetadata } from './task-metadata';
import { TaskResources } from './task-resources';

export const loadTaskResources = async <Args>(
  metadata: TaskMetadata,
  file = 'input.txt',
): Promise<TaskResources<string, Args>> => {
  const resoucesRoot = findNearestDirectoryNamed('resources');
  if (!resoucesRoot) {
    throw new Error('Could not find resources directory');
  }

  const baseUrl = join(
    resoucesRoot,
    'resources',
    metadata.year.toString(),
    metadata.day.toString().padStart(2, '0'),
  );

  const [input, args] = await Promise.all([
    fs.readFile(join(baseUrl, file), { encoding: 'utf8' }),
    // TODO make this better
    fs.readFile(join(baseUrl, `${file.split(/(.*)\..*/)[1]}args.json`), { encoding: 'utf8' })
      .catch(() => undefined),
  ]);

  return { input, args: args ? JSON.parse(args) : undefined };
};
