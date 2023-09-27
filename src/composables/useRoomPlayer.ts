import { Ref, ref } from 'vue';
import { Room } from 'src/interfaces/room';

import { getData, postData } from 'src/services/communServices';

export function useRoomPlayer() {
  const dialog = ref(false);
  const room: Ref<Room> = ref({
    name: '',
    category_room_id: 1,
    type: 1,
    // global: false,
    // fase: false,
  });

  const getRoom = async (code: string) => {
    await getData('rooms/code', { code: code }).then((resp) => {
      room.value = resp.room;
    });
  };

  const registerPlayer = async (player: object) => {
    return await postData('global/redirect_user', player, null, '').then(
      (resp) => {
        return resp;
      }
    );
  };

  const postBet = async (value: object) => {
    return await postData(
      'v2/players/bets',
      value,
      null,
      'Ticket enviado Exitosamente'
    ).then((resp) => {
      dialog.value = false;
      return resp;
    });
  };

  return {
    room,
    dialog,
    getRoom,
    registerPlayer,
    postBet,
  };
}
