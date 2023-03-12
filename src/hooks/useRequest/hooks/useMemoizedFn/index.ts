// import { isFunction } from '../utils';
// import isDev from '../utils/isDev';
import { ref, computed } from 'vue';

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

function useMemoizedFn<T extends noop>(fn: T) {
  // if (isDev) {
  //   if (!isFunction(fn)) {
  //     console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
  //   }
  // }

  const fnRef = ref<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  // fnRef.value = computed(() => fn);

  const memoizedFn = ref<PickFunction<T>>();
  if (!memoizedFn.value) {
    memoizedFn.value = function (this, ...args) {
      return fnRef.value.apply(this, args);
    };
  }

  return memoizedFn.value as T;
}

export default useMemoizedFn;
