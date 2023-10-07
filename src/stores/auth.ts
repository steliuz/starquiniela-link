import { defineStore } from 'pinia';
import { dataLogin, dataUser } from 'src/interfaces/DataLogin';
import { getData } from 'src/services/communServices';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: {} as dataUser,
    barLoading: false,
    room_id: '' as string | number | undefined,
  }),
  getters: {},
  actions: {
    userAuth(payload: dataLogin) {
      this.auth = payload.user_data;
    },
    handlebarLoading(payload: boolean) {
      this.barLoading = !payload;
    },
    setRoom(id: number | string | undefined) {
      this.room_id = id;
    },
    async getMe() {
      await getData('/user/me').then((resp) => {
        this.auth = resp.user;
      });
    },
  },
  persist: true,
});
