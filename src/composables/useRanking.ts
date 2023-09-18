import { Ref, ref } from 'vue';
import { Room } from 'src/interfaces/room';

import { getData } from 'src/services/communServices';
import { Match } from 'src/interfaces/match';
import { Player } from 'src/interfaces/user';

export function useRanking(roomID: number | string | null) {
  const matches: Ref<Match[]> = ref([
    {
      id: 0,
      name: '',
      status: true,
    },
  ]);
  const players: Ref<Player[]> = ref([]);
  const room: Ref<Room> = ref({
    name: '',
    category_room_id: 1,
    type: 1,
  });

  const getRanking = async () => {
    await getData(`rooms/${roomID}/ranking`).then((resp) => {
      players.value = resp.players;
      room.value = resp.room;
      matches.value = resp.matches;
    });
  };
  return {
    getRanking,
    matches,
    players,
    room,
  };
}
