import { PerformanceMeasure } from 'perf_hooks';
import { Solution } from './solution';
import { TaskResources } from './task-resources';

export type BenchResult<Result> = {
  result: Result;
  measure: PerformanceMeasure,
};

export const benchTask = async <Input, Result = string, Args = undefined>(
  solution: Solution<Input, Result, Args>,
  resources: TaskResources<Input, Args>,
): Promise<BenchResult<Result>> => {
  performance.mark('runstart');
  const result = await solution(resources.input, resources.args);
  performance.mark('runend');
  const measure = performance.measure('run', 'runstart', 'runend');
  return { result, measure };
};
