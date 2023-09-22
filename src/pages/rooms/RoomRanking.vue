<template>
  <section class="q-mt-md q-px-sm">
    <div class="flex justify-end">
      <q-btn
        class="q-my-sm"
        flat
        color="red-5"
        label="Regresar"
        @click="$router.go(-1)"
      />
    </div>
    <aside>
      <div class="pp mt-2 text-center hg_table" ref="containerTable">
        <table>
          <thead>
            <tr>
              <th class="name1 bg-header-dark">
                <div class="q-px-xs text-center">Jugador</div>
              </th>
              <th class="name2 text-center bg-header-dark">
                <div class="q-px-xs">Pts</div>
              </th>
              <template v-for="(team, index) of matches" :key="index">
                <th>
                  <div class="full-width full-height flex flex-center">
                    {{ index + 1 }}
                  </div>
                </th>
                <th v-if="typeRoom" class="text-center th-custom">
                  <div class="m-0 q-pa-none text-center">
                    <q-avatar size="30px">
                      <img
                        :src="
                          team?.team1?.image
                            ? `${file_url}${team?.team1?.image}`
                            : ''
                        "
                      />
                      <q-tooltip>
                        <span class="text-capitalize">
                          {{ team?.team1?.name }}</span
                        >
                      </q-tooltip>
                    </q-avatar>
                    <div class="text-center flex justify-center">
                      <p class="gols">{{ team.goalsTeam1 || '-' }}</p>
                    </div>
                  </div>
                </th>
                <th v-if="typeRoom" class="text-center th-custom2">
                  <div class="m-0 q-pa-none text-center">
                    <q-avatar size="30px">
                      <img
                        :src="
                          team?.team1?.image
                            ? `${file_url}${team?.team2?.image}`
                            : ''
                        "
                      />
                      <q-tooltip>
                        <span class="text-capitalize">
                          {{ team?.team2?.name }}
                        </span>
                      </q-tooltip>
                    </q-avatar>
                    <div class="text-center flex justify-center">
                      <p class="gols">{{ team.goalsTeam2 || '-' }}</p>
                    </div>
                  </div>
                </th>
                <th v-if="!typeRoom">
                  <div class="flex justify-center" style="width: 80px">
                    <div class="q-mx-xs">
                      <q-avatar size="30px">
                        <img :src="`${file_url}${team?.team1?.image}`" />
                        <q-tooltip>
                          <span class="text-capitalize">
                            {{ team?.team1?.name }}</span
                          >
                        </q-tooltip>
                      </q-avatar>
                      <div class="text-center flex justify-center">
                        <p class="gols">{{ team.goalsTeam1 || '-' }}</p>
                      </div>
                    </div>
                    <div class="q-mx-xs">
                      <q-avatar size="30px">
                        <img :src="`${file_url}${team?.team2?.image}`" />
                        <q-tooltip>
                          <span class="text-capitalize">
                            {{ team?.team2?.name }}
                          </span>
                        </q-tooltip>
                      </q-avatar>
                      <div class="text-center flex justify-center">
                        <p class="gols">{{ team.goalsTeam2 || '-' }}</p>
                      </div>
                    </div>
                  </div>
                </th>
              </template>
            </tr>
          </thead>
          <tbody v-if="typeRoom">
            <tr v-for="(player, rowIndex) in players" :key="rowIndex">
              <td class="name1 text-name-player">
                <div class="">{{ player.name }}</div>
              </td>
              <td class="name2 bg-orange-6 text-black text-bold">
                <div class="flex flex-center">
                  {{ getTotalPoint(player.id) }}
                </div>
              </td>

              <template v-for="match in matches" :key="match.id">
                <td class="roomNormal r">
                  <div class="text-center">
                    {{ getPoint(match.id, player.id) }}
                  </div>
                </td>
                <td class="roomNormal">
                  <p class="q-mb-none text-bold text-center">
                    {{ getBet(match.id, player.id) }}
                  </p>
                </td>
                <td class="roomNormal">
                  <p class="q-mb-none text-bold text-center">
                    {{ getBet2(match.id, player.id) }}
                  </p>
                </td>
              </template>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(player, rowIndex) in players" :key="rowIndex">
              <td class="name1">
                <div class="text-name-player">{{ player.name }}</div>
              </td>
              <td class="name2 bg-orange-6 text-black text-bold">
                <div class="flex flex-center">9</div>
              </td>
              <template v-for="(match, index) in matches" :key="index">
                <td class="lev">{{ getPoint(match.id, player.id) }}</td>
                <td class="lev">
                  <p class="q-mb-none text-bold text-center">
                    {{ getLEV(match.id, player.id) }}
                  </p>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
// import { PropType } from 'vue';
// import { QTableProps } from 'quasar';
import { useRanking } from 'src/composables/useRanking';
import { useAuthStore } from 'src/stores/auth';
import { onMounted, ref } from 'vue';
import { file_url } from 'src/boot/axios';
// import { Bet } from 'src/interfaces/bet';
// import { Match } from 'src/interfaces/match';

const { room_id: roomID } = useAuthStore();
const { getRanking, room, players, matches } = useRanking(roomID);
const containerTable = ref<HTMLElement | null>(null);

const typeRoom = ref(room.value.type != 3 ? true : false);

// const restante = (bets: Bet[]) => {
//   let count = 0;
//   count = matches.value.length ?? 0 - (bets.length ? bets.length : 0);
//   return count;
// };

onMounted(() => {
  getRanking();
});

const getPoint = (
  matchID: number | undefined,
  playerID: number | undefined
) => {
  let player = players.value.find((player) => {
    return player.bets?.find((bet) => {
      return bet.match_id == matchID && playerID == player.id;
    });
  }, {});
  let bet = player?.bets?.find((bet) => {
    return bet.match_id == matchID;
  }, {});
  return bet?.points ? bet.points : 0;
};
const getBet = (matchID: number | undefined, playerID: number | undefined) => {
  let player = players.value.find((player) => {
    return player.bets?.find((bet) => {
      return bet.match_id == matchID && playerID == player.id;
    });
  }, {});
  let bet = player?.bets?.find((bet) => {
    return bet.match_id == matchID;
  }, {});
  return bet?.goalsTeam1 ? bet.goalsTeam1 : '';
};
const getBet2 = (matchID: number | undefined, playerID: number | undefined) => {
  let player = players.value.find((player) => {
    return player.bets?.find((bet) => {
      return bet.match_id == matchID && playerID == player.id;
    });
  }, {});
  let bet = player?.bets?.find((bet) => {
    return bet.match_id == matchID;
  }, {});
  return bet?.goalsTeam2 ? bet.goalsTeam2 : '';
};

const getLEV = (matchID: number | undefined, playerID: number | undefined) => {
  let player = players.value.find((player) => {
    return player.bets?.find((bet) => {
      return bet.match_id == matchID && playerID == player.id;
    });
  }, {});
  let bet = player?.bets?.find((bet) => {
    return bet.match_id == matchID;
  }, {});

  let lev;
  switch (bet?.goalsTeam1) {
    case 1:
      lev = 'L';
      break;

    case 2:
      lev = 'E';
      break;

    case 3:
      lev = 'V';
      break;
    default:
      lev = '';
      break;
  }

  return lev;
};

const getTotalPoint = (playerID: number | undefined) => {
  let player = players.value.find((player) => {
    return player.id == playerID;
  }, {});

  let total = player?.bets?.reduce((total, bet) => {
    return total + bet.points;
  }, 0);
  return total;
};
</script>

<style lang="scss" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

aside > div.hg_table {
  height: auto;
  max-height: 700px;
  &::-webkit-scrollbar {
    width: 4px;
    height: 6px;
  }

  // &::-webkit-scrollbar-track {
  //   // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  //   // border-radius: 500px;
  // }

  &::-webkit-scrollbar-thumb {
    background-color: $secondary;
    border-radius: 500px;
  }
}

thead {
  background-color: #001e28;
  position: sticky;
  top: 0;
  z-index: 2;
}

td,
th {
  border: 1px solid #d1d1d1;
  text-align: left;
  padding: 3px;
}

// tr:nth-child(even) {
//   background-color: #001e28;
// }

th:nth-child(3n + 3) {
  background-color: #001e28;
  color: #fff;
  font-weight: 500;
  width: 30px;
}
td.roomNormal:nth-child(3n + 3) {
  background-color: #001e28;
  color: #fff;
  font-weight: 500;
  width: 30px;
}

td.lev:nth-child(odd) {
  background-color: #001e28;
  color: #fff;
  font-weight: 500;
}

.name1:nth-of-type(2n + 1) {
  position: sticky;
  height: 20px;
  left: 0;
  text-transform: capitalize;
  z-index: 1;
  background-color: #001e28;
}

.name2:nth-of-type(2n) {
  position: sticky;
  width: 50px;
  height: 20px;
  left: 68px;
  background-color: #001e28;
  z-index: 1;
}

.text-name-player {
  width: 120px;
  max-width: 120px;
}

@media (max-width: 700px) {
  .name2:nth-of-type(2n) {
    position: sticky;
    height: 20px;
    left: 68px;
    z-index: 1000;
    overflow: auto;
    -webkit-overflow-scrolling: auto;
  }
}

@media screen and (orientation: portrait) {
  aside > div.hg_table {
    height: 450px;
  }
}

@media screen and (max-width: 992px) and (orientation: landscape) {
  aside > div.hg_table {
    height: auto;
    max-height: 700px;
  }
}

.pp {
  overflow: auto;
}

.gols {
  // background-color: #fff;
  color: #fff;
  padding: 1px;
  width: 20px;
  font-size: 1rem;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 3px;
}

.th-custom {
  border-right: 1px solid transparent;
}

.th-custom2 {
  border-left: 1px solid transparent;
}

.th-custom {
  border-right: 1px solid transparent;
}

.th-custom2 {
  border-left: 1px solid transparent;
}
</style>
