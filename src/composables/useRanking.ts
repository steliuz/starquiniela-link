import { Ref, ref } from 'vue';
import { Room } from 'src/interfaces/room';

import { getData } from 'src/services/communServices';
import { Match } from 'src/interfaces/match';
// import { Player } from 'src/interfaces/user';
import { Bet } from 'src/interfaces/bet';

export function useRanking(roomID: number | string | null) {
  const matches: Ref<Match[]> = ref([
    {
      id: 0,
      name: '',
      status: true,
    },
  ]);
  const players: Ref<Bet[]> = ref([]);
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
      // players.value = players.value.sort((a, b) => b.max_points - a.max_points);
    });
  };
  return {
    getRanking,
    matches,
    players,
    room,
  };
}
