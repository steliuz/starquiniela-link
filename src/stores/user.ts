import { defineStore } from 'pinia';
import { dataLogin, dataUser } from 'src/interfaces/DataLogin';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as dataUser,
    barLoading: false,
    room_id: null as string | null | number,
  }),
  getters: {},
  actions: {
    userAuth(payload: dataLogin) {
      console.log('payload: ', payload);
      this.user = payload.user_data;
    },
    handlebarLoading(payload: boolean) {
      this.barLoading = !payload;
    },
    setRoom(id: number | string) {
      this.room_id = id;
    },
  },
  persist: true,
});
