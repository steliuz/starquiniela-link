import { Ref, ref } from 'vue';
import { Room } from 'src/interfaces/room';

import {
  getData,
  postData,
  putData,
  deleteData,
} from 'src/services/communServices';

export function useRooms() {
  const loading = ref(false);
  const dialog = ref(false);
  const tab = ref('1');
  const room: Ref<Room> = ref({
    name: '',
    category_room_id: 1,
    type: 1,
    // global: false,
    // fase: false,
  });
  const rooms = ref({
    data: [],
    page: 1,
    rowsPerPage: 20,
  });

  const getReferRoom = async (value: object = rooms.value) => {
    loading.value = true;
    await getData('referer/rooms', value).then((resp) => {
      rooms.value = resp;
      loading.value = false;
    });
  };

  const getRoom = async (value: object = rooms.value) => {
    loading.value = true;
    await getData('rooms', value).then((resp) => {
      rooms.value = resp;
      loading.value = false;
    });
  };

  const getRoomActive = async (value: object = rooms.value) => {
    loading.value = true;
    await getData('rooms/actives', value).then((resp) => {
      rooms.value = resp;
      loading.value = false;
    });
  };

  const postRoom = async (value: Room) => {
    await postData('rooms', value).then(() => {
      dialog.value = false;
      onReset();
      getRoom();
    });
  };

  const editRoom = (value: Room = room.value) => {
    room.value = JSON.parse(JSON.stringify(value));
    dialog.value = true;
  };
  const putRoom = async (value: Room) => {
    await putData('rooms/' + value.id, value).then(() => {
      dialog.value = false;
      onReset();
      getRoom();
    });
  };

  const deleteRoom = async (id: number) => {
    await deleteData('rooms/' + id).then(() => {
      getRoom();
    });
  };

  const statusRoom = async (row: Room) => {
    await putData(`rooms/status/${row.id}`, row);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRoomById = async (id: any) => {
    await getData('rooms/' + id).then((resp) => {
      room.value = resp;
    });
  };

  const onReset = () => {
    room.value = {
      name: '',
      category_room_id: 1,
      type: 1,
      // global: false,
      // fase: false,
    };
  };
  const handlerTab = (value: string) => {
    tab.value = value;
    if (value == '1') {
      getReferRoom({ rowsPerPage: 20 });
    } else {
      getRoomActive({ rowsPerPage: 20 });
    }
  };

  const buyRoom = async (id: number) => {
    await postData(`rooms/${id}/buy`).then(() => {
      getRoomActive({ rowsPerPage: 20 });
    });
  };
  return {
    loading,
    dialog,
    room,
    rooms,
    getRoom,
    postRoom,
    editRoom,
    putRoom,
    deleteRoom,
    onReset,
    statusRoom,
    getRoomById,
    getReferRoom,
    tab,
    handlerTab,
    getRoomActive,
    buyRoom,
  };
}
