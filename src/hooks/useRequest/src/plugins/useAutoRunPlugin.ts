// import { useRef } from 'react';
import { ref, watchEffect } from 'vue';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import type { Plugin } from '../types';

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    manual,
    ready = true,
    defaultParams = [],
    refreshDeps = [],
    refreshDepsAction,
  }
) => {
  const hasAutoRun = ref(false);
  hasAutoRun.value = false;

  useUpdateEffect(() => {
    if (!manual && ready) {
      hasAutoRun.value = true;
      fetchInstance.run(...defaultParams);
    }
  }, [ready]);

  // watchEffect(() => {
  // 	if (!manual && ready) {
  //     hasAutoRun.value = true;
  //     fetchInstance.run(...defaultParams);
  //   }
  // })

  useUpdateEffect(() => {
    if (hasAutoRun.value) {
      return;
    }
    if (!manual) {
      hasAutoRun.value = true;
      if (refreshDepsAction) {
        refreshDepsAction();
      } else {
        fetchInstance.refresh();
      }
    }
  }, [...refreshDeps]);

  return {
    onBefore: () => {
      if (!ready) {
        return {
          stopNow: true,
        };
      }
    },
  };
};

useAutoRunPlugin.onInit = ({ ready = true, manual }) => {
  return {
    loading: !manual && ready,
  };
};

export default useAutoRunPlugin;
