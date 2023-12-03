import { TaskMetadata } from './task-metadata';

export type Logger = (message: string) => void;

export const createLogger = (metadata: TaskMetadata): Logger => (message: string) => {
  console.log(`[aoc:${metadata.year}-${metadata.day.toString().padStart(2, '0')}]`, message);
};
