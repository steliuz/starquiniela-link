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
    rules: 0,
    category: 0,
    type: 0,
  });
  return {
    loading,
    dialog,
    room,
  };
}
