export type TaskMetadata = {
  year: number;
  day: number;
  part?: 1 | 2;
};

export const isTaskMetadata = (value: unknown): value is TaskMetadata => {
  const { year, day, part } = value as TaskMetadata;
  return (
    typeof year === 'number'
    && typeof day === 'number'
    && (part === undefined || part === 1 || part === 2)
  );
};
