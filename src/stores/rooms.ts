import { defineStore } from 'pinia';
// import { dataLogin, dataUser } from 'src/interfaces/DataLogin';

interface RoomData {
  data: Array<object>;
  page: number,
  rowsPerPage: number,
}

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    dataRooms: {} as RoomData
  }),
  getters: {
    getDataRooms(): RoomData {
      return this.dataRooms;
    },
  },
  actions: {
    updateDataRooms(payload: RoomData) {
      this.dataRooms = payload;
    },
  },
  // persist: true,
});
