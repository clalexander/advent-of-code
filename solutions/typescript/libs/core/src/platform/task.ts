import { benchTask } from './bench-task';
import { loadTaskResources } from './load-task-resources';
import { createLogger } from './logger';
import { Solution } from './solution';
import { TaskMetadata } from './task-metadata';
import { TaskResources } from './task-resources';

export const task = async <Input extends string | number, Result, Args>(
  solution: Solution<Input, Result, Args>,
  metadata: TaskMetadata,
  resourcesOverride?: TaskResources<Input, Args> | string,
): Promise<Result | undefined> => {
  const log = createLogger(metadata);
  log('Loading resources...');
  const resources = typeof resourcesOverride === 'object'
    ? resourcesOverride
    : (await loadTaskResources<Args>(metadata, resourcesOverride)) as TaskResources<Input, Args>;
  log('Starting...');
  const benchResult = await benchTask(solution, resources);
  log('Finished!');
  log(`Duration: ${benchResult.measure.duration.toPrecision(2)} ms`);
  log(`Result: ${benchResult.result}`);
  return benchResult.result;
};
