/** get args type of a function */
export type InferArgs<T> = T extends (...t: [...infer Arg]) => any
  ? Arg
  : never;

/** get return type of a function */
export type InferReturn<T> = T extends (...t: any[]) => infer Res
  ? Awaited<Res>
  : never;
