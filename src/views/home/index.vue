<template>
    <h3>mockPage</h3>
    <div class="box">
        <div>{{ res.loading }}</div>
    <div>{{ loading }}</div>
    <div class="mt-10px">
        <button @click="toReq('111')">click111</button>
    </div>
    <div class="mt-10px">
        <button @click="toReq('222')">click222</button>
    </div>
    <div class="mt-10px">
        <button @click="toReq('333')">click333</button>
    </div>
    <div class="mt-10px">
        <button @click="toReq('444')">click444</button>
    </div>
  
    </div>

  </template>
  
  <script setup lang="ts">
  /**
   * 在mockPageV2
   * 实现了防抖、节流、报错重试和缓存,
   */
  import useRequest from '../../hooks/useRequest/index';
//   import { getList } from './fetch';
  import { watch, ref } from 'vue';
  import axios  from 'axios';

  const txtRef = ref('setCache-demo');
  

const getMockList = (params: {
    name: string
}) => {
     return axios.post('https://zj.v.api.aa1.cn/api/xz/?code=654028207203',  params);
}
  const getCachefn = (data: any) => {
      console.log('getCachefn', data)
      return JSON.parse(localStorage.getItem(JSON.stringify(data)) || '{}');
  
  };
  const setCachefn = (data: any) => {
      console.log('app setCachefn', data)
      if (!data.params) {
          return;
      }
      localStorage.setItem(JSON.stringify(data.params), JSON.stringify({...data }))
  };
  const res = useRequest(getMockList, {
    debounceWait: 300,
    // throttleWait: 2000,
    manual: true,
      // pollingInterval: 3000,
    // retryCount: 3,
      // refreshOnWindowFocus: true,
      // focusTimespan: 3000,
    // cacheKey: `cacheKey-demo_${txtRef.value}`,
    // loadingDelay: 400,
    // staleTime: 1000 * 30,
    // cacheKey: txtRef.value,
    // setCache: setCachefn,
    // getCache: getCachefn,
  });
  
  /**
   * 不要解构, 会失去响应式
   */
  const { loading } = res.value;
  
  watch(
    () => res.value.loading,
    () => {
      // console.log('page watch laoding');
    }
  );
  
  const toReq = async (str: string) => {
    const result = await res.value.runAsync({name: str});
    console.log('result', result);
  };
  </script>
  <style scoped>
.box {
    display: block;
}
.mt-10px {
    margin-top: 10px;
}
</style>