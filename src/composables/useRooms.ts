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

  const postRoom = async (value: Room) => {
    await postData('rooms', value).then(() => {
      dialog.value = false;
      onReset();
      getRoom();
    });
  };

  const editRoom = (value: Room = room.value) => {
    room.value = value;
    dialog.value = true;
  };

  const getRoom = async (value: object = rooms.value) => {
    loading.value = true;
    await getData('rooms', value).then((resp) => {
      rooms.value = resp;
      loading.value = false;
    });
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
  };
}
