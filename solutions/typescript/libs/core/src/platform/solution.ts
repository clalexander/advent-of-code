import { Awaitable } from './awaitable';

export type Solution<Input = string, Result = number, Args = undefined> = (
  input: Input,
  args?: Args,
) => Awaitable<Result>;
