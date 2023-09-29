<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTeam } from 'src/composables/useTeam';
import { useRooms } from 'src/composables/useRooms';
import { useBet } from 'src/composables/useBet';
import { Team } from 'src/interfaces/team';
import { useMatch } from 'src/composables/useMatch';
import { file_url } from 'src/boot/axios';
import { Match } from 'src/interfaces/match';
import { useAuthStore } from 'src/stores/auth';
import cardMatchsComponents from './components/CardMatchs.vue';
import dialogTickets from './components/DialogTickets.vue';
import { Player } from 'src/interfaces/user';
import { PaidBet } from 'src/interfaces/bet';
// import { copyToClipboard } from 'quasar';
import sharedComponent from 'src/components/SharedComponent.vue';

const confirmTickets = ref(false);
const infoPlayer = ref();

const { room_id: roomID, auth } = useAuthStore();
const { room, getRoomById } = useRooms();
const { statusPaidBet } = useBet();
const formMatch = ref({
  team1: null,
  team2: null,
});
const { selectTeams, optionsTeams, loading } = useTeam();
const { postMatch, deleteMatch, statusMatch, resultMatch } = useMatch(roomID);

onMounted(async () => {
  if (auth.role_id === 1) await selectTeams();
  await getRoomById(roomID);
});

const options = ref(optionsTeams.value);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterFn(val: any, update: any) {
  if (val === '') {
    update(() => {
      options.value = optionsTeams.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = optionsTeams.value.filter(
      (v: Team) => v.name.toLowerCase().indexOf(needle) > -1
    );
  });
}

const onSubmit = async () => {
  let data = {
    room_id: roomID,
    team1: formMatch.value.team1,
    team2: formMatch.value.team2,
  };
  await postMatch(data).then(() => {
    getRoomById(roomID);
    formMatch.value = {
      team1: null,
      team2: null,
    };
  });
};

const openTickets = (player: Player) => {
  infoPlayer.value = player;
  confirmTickets.value = !confirmTickets.value;
};

async function onSave(match: Match) {
  await resultMatch(match);
  await getRoomById(roomID);
}
async function onStatus(match: Match) {
  await statusMatch(match);
  await getRoomById(roomID);
}

async function onDelete(id: number | null | undefined | string) {
  await deleteMatch(id);
  await getRoomById(roomID);
}

const statusPaid = async (value: PaidBet) => {
  value.room_id = roomID;
  await statusPaidBet(value);
};

// const clipboard = () => {
//   let url = `${vue_url}/rooms/${room.value.room_user?.cod_compartir}`;
//   copyToClipboard(url)
//     .then(() => {
//       // success!
//       console.log('success');
//     })
//     .catch(() => {
//       // fail
//       console.log('fail');
//     });
// };
</script>
<template>
  <section class="q-mt-md q-px-sm">
    <div class="flex justify-end">
      <q-btn
        class="px-3"
        flat
        color="red-5"
        label="Regresar"
        @click="$router.go(-1)"
      />
    </div>
    <div class="row q-mb-md">
      <div class="col-12 full-width" v-if="auth.role_id == 1">
        <q-form class="box-form" @submit="onSubmit">
          <div class="row">
            <div class="col-6 col-md-5 q-px-sm">
              <q-select
                dense
                dark
                filled
                v-model="formMatch.team1"
                :options="options"
                label="Equipo 1"
                color="teal"
                options-selected-class="text-deep-orange"
                :option-disable="
                  (item) => (item.id === formMatch.team2 ? true : false)
                "
                map-options
                emit-value
                option-label="name"
                option-value="id"
                use-input
                @filter="filterFn"
                :loading="loading"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white">
                        <q-img
                          :src="file_url + scope.opt.image"
                          :ratio="1"
                          spinner-color="primary"
                          spinner-size="82px"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.name }}</q-item-label>
                      <!-- <q-item-label caption>{{
                        scope.opt.description
                      }}</q-item-label> -->
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-6 col-md-5 q-px-sm">
              <q-select
                dark
                dense
                filled
                v-model="formMatch.team2"
                :options="options"
                label="Equipo 2"
                color="teal"
                options-selected-class="text-deep-orange"
                :option-disable="
                  (item) => (item.id === formMatch.team1 ? true : false)
                "
                map-options
                emit-value
                option-label="name"
                option-value="id"
                use-input
                @filter="filterFn"
                :loading="loading"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white">
                        <q-img
                          :src="file_url + scope.opt.image"
                          :ratio="1"
                          spinner-color="primary"
                          spinner-size="82px"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.name }}</q-item-label>
                      <!-- <q-item-label caption>{{
                        scope.opt.description
                      }}</q-item-label> -->
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-2 flex justify-center">
              <q-btn
                label="Agregar"
                class="q-mt-md q-mt-md-none"
                type="submit"
                color="secondary"
              />
            </div>
          </div>
        </q-form>
      </div>
    </div>
    <div class="row q-mt-xl">
      <div
        class=""
        :class="
          auth.role_id == 1
            ? 'col-12'
            : 'col-12 col-md-6 offset-md-1 q-px-md-md'
        "
      >
        <div class="name-quiniela">
          <p class="q-mb-none text-body2 text-weight-bold ellipsis">
            {{ room.name || '' }}
          </p>
          <div>
            <sharedComponent :code="room.room_user?.cod_compartir" />
            <q-btn
              flat
              color="orange-5"
              @click="$router.push('/admin/rooms/ranking')"
            >
              <i class="fa-solid fa-trophy text-orange-5 fa-xl"></i>
            </q-btn>
          </div>
        </div>
        <cardMatchsComponents
          v-if="room.matches?.length != 0"
          :dataMatch="room.matches"
          @emitSave="onSave"
          @emitStatus="onStatus"
          @emitDelete="onDelete"
        />
      </div>
      <div class="col-12 col-md-4 q-px-md" v-if="auth.role_id != 1">
        <div class="name-quiniela">
          <p class="q-mb-none q-pl-md text-body2 text-weight-bold ellipsis">
            Lista de jugadores
          </p>
          <dialogTickets
            v-model="confirmTickets"
            :infoPlayer="infoPlayer"
            @on-paid="statusPaid"
          />
        </div>
        <q-list>
          <div v-for="player in room.players" :key="player.id">
            <q-item>
              <q-item-section>
                <q-item-label>
                  <a
                    class="text-white nameCustom"
                    @click="openTickets(player)"
                    >{{ player.name }}</a
                  >
                  <i
                    class="fa-solid fa-circle-check text-secondary fa-xl q-mt-md q-ml-sm"
                  ></i>
                </q-item-label>
                <q-item-label class="text-white q-pl-sm" caption lines="2">
                  <div class="q-pt-sm">
                    {{ player.email }}
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator dark inset />
          </div>
        </q-list>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.box-form {
  max-width: 700px;
  margin: 0 auto;
}

.nameCustom {
  margin-bottom: 0;
  font-size: 16px;
  padding-left: 5px;
  font-weight: bold;
  text-transform: capitalize;
  text-decoration: underline;
  cursor: pointer;
}

.name-quiniela {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 700px;
  margin: 10px auto;
  color: #fff;
}

.card-matchs {
  max-width: 700px;
  margin: 0 auto;

  .q-field--dense .q-field__control,
  .q-field--dense .q-field__marginal {
    height: 25px !important;
    padding-top: 0;
    padding-bottom: 0;
  }

  p {
    margin-bottom: 0;
  }

  .box-matchs {
    display: grid;
    grid-template-columns: 0.3fr repeat(1, minmax(100px, 3fr)) 0.6fr 30px;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-bottom: 1px solid #e6e6e6;
    color: #646464;

    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(1, minmax(100px, 3fr)) 2fr 30px;
    }

    &:first-child {
      border-bottom: 0px solid transparent;
      padding-bottom: 0;
      padding-top: 0;
    }

    &:nth-of-type(2) {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: 0px solid transparent;
    }

    .index-number {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      font-size: 1.2rem;
      font-weight: bold;

      @media screen and (max-width: 500px) {
        display: none;
      }
    }

    .box-team {
      display: flex;
      flex-direction: column;

      & > div {
        display: flex;

        p {
          line-height: 18px;
          padding-left: 10px;
          padding-top: 2px;
          padding-bottom: 2px;
          text-transform: uppercase;
        }

        img.img-team {
          margin: 3px 0px;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          box-shadow: 2px 2px 3px rgba($color: #000000, $alpha: 0.1);
        }
      }
    }

    .box-result {
      display: grid;
      grid-template-columns: repeat(2, auto);
      align-items: center;
      gap: 15px;
      justify-content: flex-end;
      align-items: center;
      padding-right: 8px;
      border-right: 1px solid #e6e6e6;

      .mt-negative {
        margin-top: -30px;
      }

      .input-first {
        padding-right: 4px;
      }

      @media screen and (max-width: 500px) {
        gap: 8px;
      }
    }

    .box-options {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
