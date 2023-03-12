// import type { DependencyList } from 'react';
import { ref } from 'vue';
import depsAreSame from '../../utils/depsAreSame';

export default function useCreation<T>(factory: () => T, deps: []) {
  const { value } = ref({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });
  if (value.initialized === false || !depsAreSame(value.deps, deps)) {
    value.deps = deps;
    value.obj = factory();
    value.initialized = true;
  }
  return value.obj as T;
}
