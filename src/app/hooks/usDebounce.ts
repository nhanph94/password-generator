import { useEffect } from "react";
import { debounce } from "src/app/helpers";

export const useDebounce = <A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number | undefined = 500
): ((args: A) => Promise<R>) => {
  const [debouncedFun, teardown] = debounce<A, R>(fn, ms);

  useEffect(() => () => teardown(), []);

  return debouncedFun;
};
