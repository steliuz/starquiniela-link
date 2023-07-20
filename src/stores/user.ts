import { defineStore } from 'pinia';
import { User } from 'src/interfaces/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
    barLoading: false,
  }),
  getters: {},
  actions: {
    userAuth(payload: User) {
      console.log('payload: ', payload);
      this.user = payload;
    },
    handlebarLoading(payload: boolean) {
      this.barLoading = !payload;
    },
  },
  persist: true,
}
);
