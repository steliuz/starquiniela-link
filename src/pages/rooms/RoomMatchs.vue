<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
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

const imgBase64 = ref(
  'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIHZpZXdCb3g9IjAgMCAxODAgMTgwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2ZmZmZmZiIvPjxnIHRyYW5zZm9ybT0ic2NhbGUoNi4yMDcpIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMCAwTDEwIDJMMTEgMkwxMSAwWk0xMiAwTDEyIDFMMTQgMUwxNCA3TDE1IDdMMTUgOEwxNCA4TDE0IDlMMTIgOUwxMiA3TDEzIDdMMTMgNUwxMSA1TDExIDZMMTAgNkwxMCA0TDExIDRMMTEgM0w4IDNMOCA0TDkgNEw5IDVMOCA1TDggN0w5IDdMOSA4TDYgOEw2IDlMNSA5TDUgOEwwIDhMMCA5TDMgOUwzIDEwTDQgMTBMNCAxMUwzIDExTDMgMTJMNCAxMkw0IDEzTDIgMTNMMiAxMUwxIDExTDEgMTBMMCAxMEwwIDExTDEgMTFMMSAxM0wwIDEzTDAgMTRMMSAxNEwxIDEzTDIgMTNMMiAxNUwzIDE1TDMgMTRMNCAxNEw0IDEzTDUgMTNMNSAxNEw2IDE0TDYgMTVMNSAxNUw1IDE2TDYgMTZMNiAxN0wzIDE3TDMgMTZMMiAxNkwyIDIwTDMgMjBMMyAyMUw1IDIxTDUgMThMNiAxOEw2IDE5TDcgMTlMNyAyMEw2IDIwTDYgMjFMNyAyMUw3IDIwTDggMjBMOCAyM0w5IDIzTDkgMjRMOCAyNEw4IDI5TDEwIDI5TDEwIDI3TDExIDI3TDExIDI1TDEyIDI1TDEyIDI2TDEzIDI2TDEzIDI3TDEyIDI3TDEyIDI5TDEzIDI5TDEzIDI4TDE0IDI4TDE0IDI5TDE3IDI5TDE3IDI3TDE2IDI3TDE2IDI2TDE5IDI2TDE5IDI1TDEyIDI1TDEyIDIzTDEzIDIzTDEzIDIyTDExIDIyTDExIDIxTDEwIDIxTDEwIDE4TDExIDE4TDExIDE3TDEyIDE3TDEyIDE4TDEzIDE4TDEzIDE5TDEyIDE5TDEyIDIxTDEzIDIxTDEzIDIwTDE0IDIwTDE0IDIxTDE3IDIxTDE3IDIyTDE1IDIyTDE1IDIzTDE0IDIzTDE0IDI0TDE3IDI0TDE3IDIzTDE4IDIzTDE4IDIyTDE5IDIyTDE5IDIzTDIwIDIzTDIwIDI3TDE5IDI3TDE5IDI4TDIxIDI4TDIxIDI5TDIyIDI5TDIyIDI4TDIxIDI4TDIxIDI1TDI1IDI1TDI1IDI2TDIyIDI2TDIyIDI3TDIzIDI3TDIzIDI5TDI0IDI5TDI0IDI3TDI1IDI3TDI1IDI4TDI2IDI4TDI2IDI5TDI3IDI5TDI3IDI4TDI4IDI4TDI4IDI2TDI5IDI2TDI5IDI0TDI4IDI0TDI4IDIzTDI3IDIzTDI3IDIyTDI5IDIyTDI5IDIwTDI4IDIwTDI4IDE5TDI3IDE5TDI3IDE2TDI4IDE2TDI4IDE1TDI3IDE1TDI3IDEyTDI4IDEyTDI4IDExTDI3IDExTDI3IDEyTDI1IDEyTDI1IDEzTDIxIDEzTDIxIDEyTDIyIDEyTDIyIDExTDIzIDExTDIzIDEyTDI0IDEyTDI0IDExTDI1IDExTDI1IDlMMjYgOUwyNiA4TDI1IDhMMjUgOUwyNCA5TDI0IDhMMjMgOEwyMyA5TDIyIDlMMjIgOEwyMCA4TDIwIDlMMTggOUwxOCA4TDE3IDhMMTcgNkwxOCA2TDE4IDdMMTkgN0wxOSA2TDE4IDZMMTggNUwyMCA1TDIwIDNMMjEgM0wyMSAwTDE5IDBMMTkgMUwxNyAxTDE3IDBMMTUgMEwxNSAxTDE0IDFMMTQgMFpNOCAxTDggMkw5IDJMOSAxWk0xNiAxTDE2IDJMMTUgMkwxNSAzTDE4IDNMMTggNEwxOSA0TDE5IDNMMTggM0wxOCAyTDE3IDJMMTcgMVpNMTkgMUwxOSAyTDIwIDJMMjAgMVpNMTIgMkwxMiA0TDEzIDRMMTMgMlpNMTUgNEwxNSA1TDE3IDVMMTcgNFpNOSA2TDkgN0wxMCA3TDEwIDZaTTExIDZMMTEgN0wxMiA3TDEyIDZaTTE1IDZMMTUgN0wxNiA3TDE2IDZaTTIwIDZMMjAgN0wyMSA3TDIxIDZaTTEwIDhMMTAgOUw2IDlMNiAxMEw1IDEwTDUgOUw0IDlMNCAxMEw1IDEwTDUgMTFMNCAxMUw0IDEyTDUgMTJMNSAxM0w2IDEzTDYgMTRMNyAxNEw3IDE1TDYgMTVMNiAxNkw3IDE2TDcgMTVMOCAxNUw4IDE4TDcgMThMNyAxN0w2IDE3TDYgMThMNyAxOEw3IDE5TDkgMTlMOSAxOEwxMCAxOEwxMCAxN0wxMSAxN0wxMSAxNkwxMCAxNkwxMCAxN0w5IDE3TDkgMTRMOCAxNEw4IDEzTDYgMTNMNiAxMkw3IDEyTDcgMTFMOCAxMUw4IDEyTDExIDEyTDExIDEzTDEwIDEzTDEwIDE1TDExIDE1TDExIDE0TDEzIDE0TDEzIDE1TDEyIDE1TDEyIDE3TDE0IDE3TDE0IDE4TDE1IDE4TDE1IDE3TDE3IDE3TDE3IDE4TDE5IDE4TDE5IDE5TDE2IDE5TDE2IDIwTDIyIDIwTDIyIDE5TDIzIDE5TDIzIDIwTDI0IDIwTDI0IDE5TDI1IDE5TDI1IDIxTDI2IDIxTDI2IDIwTDI3IDIwTDI3IDE5TDI1IDE5TDI1IDE4TDI0IDE4TDI0IDE5TDIzIDE5TDIzIDE4TDIyIDE4TDIyIDE3TDI2IDE3TDI2IDE2TDI3IDE2TDI3IDE1TDI2IDE1TDI2IDEzTDI1IDEzTDI1IDE2TDI0IDE2TDI0IDE1TDIzIDE1TDIzIDE2TDIyIDE2TDIyIDE0TDIxIDE0TDIxIDEzTDIwIDEzTDIwIDEyTDIxIDEyTDIxIDlMMjAgOUwyMCAxMEwxOCAxMEwxOCAxMUwxNyAxMUwxNyAxMEwxNiAxMEwxNiAxMUwxNSAxMUwxNSA5TDE0IDlMMTQgMTBMMTIgMTBMMTIgOUwxMSA5TDExIDhaTTE2IDhMMTYgOUwxNyA5TDE3IDhaTTI3IDhMMjcgOUwyOCA5TDI4IDEwTDI5IDEwTDI5IDlMMjggOUwyOCA4Wk0xMCA5TDEwIDExTDExIDExTDExIDlaTTYgMTBMNiAxMUw1IDExTDUgMTJMNiAxMkw2IDExTDcgMTFMNyAxMFpNOCAxMEw4IDExTDkgMTFMOSAxMFpNMjMgMTBMMjMgMTFMMjQgMTFMMjQgMTBaTTEyIDExTDEyIDEzTDEzIDEzTDEzIDE0TDE0IDE0TDE0IDE2TDE1IDE2TDE1IDE1TDE2IDE1TDE2IDE2TDE3IDE2TDE3IDE3TDE4IDE3TDE4IDE2TDE3IDE2TDE3IDE1TDE2IDE1TDE2IDE0TDIwIDE0TDIwIDEzTDE4IDEzTDE4IDEyTDE3IDEyTDE3IDEzTDE2IDEzTDE2IDE0TDE1IDE0TDE1IDEzTDE0IDEzTDE0IDEyTDE1IDEyTDE1IDExTDE0IDExTDE0IDEyTDEzIDEyTDEzIDExWk0yOCAxM0wyOCAxNEwyOSAxNEwyOSAxM1pNMCAxNkwwIDIxTDEgMjFMMSAxNlpNMjAgMTZMMjAgMTdMMTkgMTdMMTkgMThMMjAgMThMMjAgMTlMMjIgMTlMMjIgMThMMjAgMThMMjAgMTdMMjEgMTdMMjEgMTZaTTI4IDE3TDI4IDE4TDI5IDE4TDI5IDE3Wk0zIDE5TDMgMjBMNCAyMEw0IDE5Wk0xNCAxOUwxNCAyMEwxNSAyMEwxNSAxOVpNMjEgMjFMMjEgMjRMMjQgMjRMMjQgMjFaTTkgMjJMOSAyM0wxMCAyM0wxMCAyNEw5IDI0TDkgMjZMMTAgMjZMMTAgMjVMMTEgMjVMMTEgMjJaTTIyIDIyTDIyIDIzTDIzIDIzTDIzIDIyWk0yNiAyM0wyNiAyNEwyNSAyNEwyNSAyNUwyNiAyNUwyNiAyNEwyNyAyNEwyNyAyM1pNMjUgMjZMMjUgMjdMMjYgMjdMMjYgMjhMMjcgMjhMMjcgMjZaTTE0IDI3TDE0IDI4TDE1IDI4TDE1IDI3Wk0wIDBMMCA3TDcgN0w3IDBaTTEgMUwxIDZMNiA2TDYgMVpNMiAyTDIgNUw1IDVMNSAyWk0yMiAwTDIyIDdMMjkgN0wyOSAwWk0yMyAxTDIzIDZMMjggNkwyOCAxWk0yNCAyTDI0IDVMMjcgNUwyNyAyWk0wIDIyTDAgMjlMNyAyOUw3IDIyWk0xIDIzTDEgMjhMNiAyOEw2IDIzWk0yIDI0TDIgMjdMNSAyN0w1IDI0WiIgZmlsbD0iIzAwMDAwMCIvPjwvZz48L2c+PC9zdmc+Cg=='
);

const { room_id: roomID, auth } = useAuthStore();
const { room, getRoomById, loading: loadingRoom } = useRooms();
const { statusPaidBet } = useBet();
const formMatch = ref({
  team1: null,
  team2: null,
});
const { selectTeams, optionsTeams, loading } = useTeam();
const { postMatch, deleteMatch, statusMatch, resultMatch, statusAllMatch } =
  useMatch(roomID);

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
  await getRoomById(roomID);
};

const statusAll = computed(() => {
  let check = false;
  room.value.matches?.map((match) => {
    if (match.status == 0) check = true;
  });
  return check;
});

const updateStatusAll = async () => {
  console.log('hola');
  await statusAllMatch(statusAll.value ? 1 : 0);
  await getRoomById(roomID);
};
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
          <div>
            <p class="q-mb-none text-body2 text-weight-bold ellipsis">
              {{ room.name || '' }}
            </p>
            <p class="q-mb-none text-caption" v-if="auth.role_id == 3">
              Autorizados:
              <span class="text-orange-5">
                {{ room.count_player || 0 }} /
                {{ room.room_user?.limit_player ?? '--' }}
              </span>
            </p>
          </div>
          <div>
            <sharedComponent
              :code="room.room_user?.cod_compartir"
              :imgBase64="imgBase64"
            />
            <q-btn
              flat
              color="orange-5"
              @click="$router.push('/admin/rooms/ranking')"
            >
              <i class="fa-solid fa-trophy text-orange-5 fa-xl"></i>
            </q-btn>

            <q-btn color="primary" flat
              ><i
                class="fa-solid fa-xl"
                :class="
                  statusAll ? 'fa-unlock text-white' : 'fa-lock text-orange-5'
                "
              ></i>
              <q-popup-proxy>
                <q-banner class="bg-header-dark q-pa-lg">
                  <div class="row">
                    <div class="col-12">
                      <p class="ellipsis-2 text-center text-h6">
                        ¿Está seguro de
                        {{ statusAll ? 'abrir' : 'cerrar' }} todas las
                        predicciones?
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6 text-center q-pa-sm">
                      <q-btn
                        class="full-width"
                        outline
                        color="negative"
                        label="Cancelar"
                        v-close-popup
                      />
                    </div>
                    <div class="col-12 col-sm-6 text-center q-pa-sm">
                      <q-btn
                        class="full-width"
                        color="secondary"
                        label="Guardar"
                        v-close-popup
                        @click.stop.prevent="updateStatusAll"
                      />
                    </div>
                  </div>
                </q-banner>
              </q-popup-proxy>
            </q-btn>
          </div>
        </div>
        <cardMatchsComponents
          v-if="room.matches?.length != 0"
          :dataMatch="room.matches"
          @emitSave="onSave"
          @emitStatus="onStatus"
          @emitDelete="onDelete"
          :key="loadingRoom ? 1 : 0"
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
  flex-wrap: wrap;
  align-items: center;
  max-width: 700px;
  margin: 10px auto;
  color: #fff;

  @media screen and (max-width: 567px) {
    justify-content: space-around;
  }
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
