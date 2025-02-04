/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { getData } from 'src/services/communServices';

export const useSubscribeStore = defineStore('subscribe', {
  state: () => ({
    subscribes: [] as any,
  }),

  getters: {},

  actions: {
    async getSubscribe() {
      getData('v2/subscribes').then((resp) => {
        this.subscribes = resp.data;
      });
    },
  },
  persist: true,
});
