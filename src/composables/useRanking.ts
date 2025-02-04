import { Ref, ref } from 'vue';
import { Room } from 'src/interfaces/room';

import { getData } from 'src/services/communServices';
import { Match } from 'src/interfaces/match';
// import { Player } from 'src/interfaces/user';
import { Bet } from 'src/interfaces/bet';

export function useRanking(roomID: number | string | undefined) {
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

  const getRanking = async (role_id = 0) => {
    const token = localStorage.getItem('access_token');
    const url =
      role_id == 3 && token
        ? `rooms/${roomID}/ranking`
        : `v2/rooms/${roomID}/players/ranking`;
    await getData(url).then((resp) => {
      players.value = resp.players;
      room.value = resp.room;
      matches.value = resp.matches;
      // players.value = players.value.sort((a, b) => b.max_points - a.max_points);
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTicketPdf = async (params: any, options: any) => {
    const data = await getData(`v2/ranking/${roomID}/pdf`, params, options);
    return data;
  };

  return {
    getRanking,
    matches,
    players,
    room,
    getTicketPdf,
  };
}
