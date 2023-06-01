// import { defineStore } from 'pinia';

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    barLoading: false,
  }),
  getters: {},
  actions: {
    userAuth(payload: any) {
      this.user = payload;
    },
    handlebarLoading(payload: any) {
      this.barLoading = !payload;
    },
  },
});
