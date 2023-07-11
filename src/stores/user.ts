import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    barLoading: false,
  }),
  getters: {},
  actions: {
    userAuth(payload: object) {
      this.user = payload;
    },
    handlebarLoading(payload: boolean) {
      this.barLoading = !payload;
    },
  },
});
