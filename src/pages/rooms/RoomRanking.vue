<template>
  <section class="row q-mt-lg">
    <div class="col-12 col-md-10 offset-md-1 q-px-md">
      <div class="flex justify-between q-mb-md">
        <div v-if="auth.role_id == 3">
          <h6 class="text-h6 no-margin">
            {{ room.name }}
          </h6>
          <p
            class="q-mb-none"
            :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
          >
            Autorizados:
            <span
              class="q-ml-xs"
              :class="$q.dark.isActive ? 'text-orange-6' : 'text-primary'"
            >
              {{ room.count_player || 0 }} /
              {{ room.room_user?.limit_player ?? '--' }}
            </span>
          </p>
          <q-btn
            class="q-mt-sm"
            outline
            :color="$q.dark.isActive ? 'secondary' : 'Primary'"
            label="Descargar"
            @click="goToRankingPDF"
          />
        </div>

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
                  <th class="bg-gray-custom-table">
                    <div
                      class="full-width full-height flex flex-center bg-gray-custom-table"
                    >
                      {{ index + 1 }}
                    </div>
                  </th>
                  <th v-if="room.type != 3" class="text-center th-custom">
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
                        <p class="gols">
                          {{ team.goalsTeam1 != null ? team.goalsTeam1 : '-' }}
                        </p>
                      </div>
                    </div>
                  </th>
                  <th v-if="room.type != 3" class="text-center th-custom2">
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
                        <p class="gols">
                          {{ team.goalsTeam2 != null ? team.goalsTeam2 : '-' }}
                        </p>
                      </div>
                    </div>
                  </th>
                  <th v-if="room.type == 3" class="bg-gray-2-custom-table">
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
                          <p class="gols">
                            {{
                              team.goalsTeam1 != null ? team.goalsTeam1 : '-'
                            }}
                          </p>
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
                          <p class="gols">
                            {{
                              team.goalsTeam2 != null ? team.goalsTeam2 : '-'
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </th>
                </template>
              </tr>
            </thead>
            <tbody v-if="room.type != 3">
              <tr v-for="(player, rowIndex) in players" :key="rowIndex">
                <td class="name1 text-name-player">
                  <div class="">
                    {{ player?.user?.name || '' }}
                    <p
                      class="text-caption no-margin"
                      :class="
                        $q.dark.isActive ? 'text-orange-5' : 'text-primary'
                      "
                    >
                      {{ `(${player.ticket_factura})` }}
                    </p>
                  </div>
                </td>
                <td
                  class="name2 text-bold"
                  :class="
                    $q.dark.isActive
                      ? 'bg-orange-5 text-black'
                      : 'bg-primary text-white'
                  "
                >
                  <div class="flex flex-center">
                    {{ player.max_points }}
                  </div>
                </td>

                <template v-for="match in matches" :key="match.id">
                  <td class="roomNormal">
                    <div class="text-center">
                      {{ getPoint(match.id, player.user_id, player.index) }}
                    </div>
                  </td>
                  <td class="roomNormal">
                    <p class="q-mb-none text-bold text-center">
                      {{ getBet(match.id, player.user_id, player.index) }}
                    </p>
                  </td>
                  <td class="roomNormal">
                    <p class="q-mb-none text-bold text-center">
                      {{ getBet2(match.id, player.user_id, player.index) }}
                    </p>
                  </td>
                </template>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="(player, rowIndex) in players" :key="rowIndex">
                <td class="name1">
                  <div class="text-name-player">
                    {{ player?.user?.name || '' }}
                    <p
                      class="text-caption no-margin"
                      :class="
                        $q.dark.isActive ? ' text-orange-5' : 'text-primary'
                      "
                    >
                      {{ `(${player.ticket_factura})` }}
                    </p>
                  </div>
                </td>
                <td class="name2 bg-orange-6 text-black text-bold">
                  <div class="flex flex-center">{{ player.max_points }}</div>
                </td>
                <template v-for="(match, index) in matches" :key="index">
                  <td class="lev">
                    {{ getPoint(match.id, player.user_id, player.index) }}
                  </td>
                  <td class="lev">
                    <p class="q-mb-none text-bold text-center">
                      {{ getLEV(match.id, player.user_id, player.index) }}
                    </p>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRanking } from 'src/composables/useRanking';
import { useAuthStore } from 'src/stores/auth';
import { onMounted, ref } from 'vue';
import { file_url } from 'src/boot/axios';
import { useRouter } from 'vue-router';

const { room_id: roomID, auth } = useAuthStore();
const { getRanking, room, players, matches } = useRanking(roomID);
const containerTable = ref<HTMLElement | null>(null);

const router = useRouter();

const typeRoom = ref(false);

onMounted(() => {
  getRanking(auth.role_id);
  typeRoom.value = room.value.type == 3;
});

const getPoint = (
  matchID: number | undefined | null,
  playerID: number | undefined,
  index: number
) => {
  let player = room.value.players?.find((player) => {
    return playerID == player.id;
  }, {});

  let bet = player?.bets?.find((bet) => {
    return bet.match_id == matchID && bet.index == index;
  }, {});

  console.log('bet:', bet);
  return bet?.points ? bet.points : 0;
};
const getBet = (
  matchID: number | undefined | null,
  playerID: number | undefined,
  index: number
) => {
  let player = room.value.players?.find((player) => {
    return playerID == player.id;
  }, {});

  let bet = player?.bets?.find((bet) => {
    return bet.match_id == matchID && bet.index == index;
  }, {});

  return bet?.goalsTeam1 != null ? bet.goalsTeam1 : '';
};
const getBet2 = (
  matchID: number | undefined | null,
  playerID: number | undefined,
  index: number
) => {
  let player = room.value.players?.find((player) => {
    return playerID == player.id;
  }, {});

  let bet = player?.bets?.find((bet) => {
    return bet.match_id == matchID && bet.index == index;
  }, {});

  return bet?.goalsTeam2 != null ? bet.goalsTeam2 : '';
};

const getLEV = (
  matchID: number | undefined | null,
  playerID: number | undefined,
  index: number
) => {
  let player = room.value.players?.find((player) => {
    return playerID == player.id;
  }, {});

  let bet = player?.bets?.find((bet) => {
    return bet.match_id == matchID && bet.index == index;
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
      lev = '-';
      break;
  }

  return lev;
};

const goToRankingPDF = () => {
  let route = router.resolve(`/ranking/${roomID}/pdf`);
  window.open(route.href, '_blank');
};
</script>

<style lang="scss" scoped>
.body--light {
  table {
    color: #222;
    background-color: #ebe9e9;
  }

  thead {
    background-color: #ebe9e9;
  }

  .bg-gray-custom-table {
    background-color: #c8c8c9;
    color: #222;
    width: 15px;
  }
  .bg-gray-2-custom-table {
    background-color: #ebe9e9;
    color: #222;
  }

  h {
    border: 1px solid #d1d1d1;
    text-align: left;
    padding: 3px;
  }

  td.roomNormal:nth-child(3n + 3) {
    background-color: #c8c8c9;
    color: #222;
    font-weight: 500;
    width: 30px;
  }

  td.lev:nth-child(odd) {
    background-color: #c8c8c9;
    color: #222;
    font-weight: 500;
  }

  .name1:nth-of-type(2n + 1) {
    position: sticky;
    height: 20px;
    left: 0;
    text-transform: capitalize;
    z-index: 1;
    background-color: #c8c8c9;
  }

  .name2:nth-of-type(2n) {
    position: sticky;
    width: 50px;
    height: 20px;
    left: 68px;
    background-color: #c8c8c9;
    z-index: 1;
  }

  .gols {
    color: #222;
  }

  .bg-img {
    background-image: url('src/assets/bg-white.png');
  }
}

.body--dark {
  .text-rankin-white {
    color: #fff;
  }
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  color: #fff;
  background-color: #010a0f;
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
