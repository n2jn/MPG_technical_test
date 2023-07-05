import {useEffect, useState} from 'react';

type InferArgs<T> = T extends (...t: [...infer Arg]) => any ? Arg : never;
type InferReturn<T> = T extends (...t: any[]) => infer Res
  ? Awaited<Res>
  : never;

type ReturnValue<T> = {
  loading: boolean;
  error: any;
  data: InferReturn<T> | null;
  handler: (...args: InferArgs<T>) => void;
};

export const useLoadable = <
  T extends (...args: InferArgs<T>) => Promise<InferReturn<T>>,
>(
  fn: T,
): ReturnValue<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<InferReturn<T> | null>(null);

  useEffect(() => {
    if (!fn || typeof fn !== 'function')
      throw new Error(
        `
        Invalid argument for useLoadable:
        please pass a function from api folder
        `,
      );
  }, []);

  const handler = (...args: InferArgs<T>) => {
    setLoading(true);
    setError(null);
    setData(null);

    async function run() {
      try {
        const res = await fn(...args);
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    run();
  };

  return {
    loading,
    error,
    data,
    handler,
  };
};
