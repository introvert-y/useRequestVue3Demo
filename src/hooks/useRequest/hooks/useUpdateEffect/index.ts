import { ref, onBeforeUnmount, watch } from 'vue';

export default function useUpdateEffect (effect: Function, deps: any) {
  const isMounted = ref(false);

  // for react-refresh
  onBeforeUnmount(() => {
    isMounted.value = false;
  });

  watch(
    () => deps,
    () => {
      if (!isMounted.value) {
        isMounted.value = true;
      } else {
        effect();
      }
    }
  );
};


