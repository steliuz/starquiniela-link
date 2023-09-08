import { defineStore } from 'pinia';

interface UserData {
  data: Array<object>;
  page: number,
  rowsPerPage: number,
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    dataUsers: {} as UserData
  }),
  getters: {
    getDataUser(): UserData {
      return this.dataUsers;
    },
  },
  actions: {
    updateDataRooms(payload: UserData) {
      this.dataUsers = payload;
    },
  },
  // persist: true,
});
