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
// import dialogTickets from './components/DialogTickets.vue';
// import { Player } from 'src/interfaces/user';
import { PaidBet } from 'src/interfaces/bet';
// import { copyToClipboard } from 'quasar';
import sharedComponent from 'src/components/SharedComponent.vue';
import DialogUpgrade from 'src/components/DialogUpgrade.vue';
import { handleMessages } from 'src/services/notifys';

// const confirmTickets = ref(false);
// const infoPlayer = ref();

const { room_id: roomID, auth } = useAuthStore();
const {
  room,
  getRoomById,
  loading: loadingRoom,
  getQrRoom,
  qrcode,
  filteredTicket,
  search,
  postUpgradePremium,
} = useRooms();
const { statusPaidBet } = useBet();
const formMatch = ref({
  team1: null,
  team2: null,
});
const { selectTeams, optionsTeams, loading } = useTeam();
const {
  postMatch,
  deleteMatch,
  statusMatch,
  resultMatch,
  statusAllMatch,
  resetMatch,
} = useMatch(roomID);
const dialogUpgrade = ref(false);

onMounted(async () => {
  if (auth.role_id === 1) await selectTeams();
  await getRoomById(roomID);
  await getQrRoom(`${room.value.room_user?.cod_compartir}`);
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

// const openTickets = (player: Player) => {
//   infoPlayer.value = player;
//   confirmTickets.value = !confirmTickets.value;
// };

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
  if (
    (room.value?.count_player ?? 0) >=
      (room.value?.room_user?.limit_player ?? 0) &&
    value.paid == 1
  ) {
    handleMessages({
      message: 'Se ha superado el límite de aprobación de tickets',
      color: 'red-7',
      icon: 'info',
      position: 'center',
    });
    value.paid = 0;
    dialogUpgrade.value = true;
    return;
  }
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
  await statusAllMatch(statusAll.value ? 1 : 0);
  await getRoomById(roomID);
};

const onResetMatch = async (id: number) => {
  await resetMatch(id);
  await getRoomById(roomID);
};

const upgradePremium = async (id: number) => {
  let data = {
    subscribe_id: id,
    room_id: roomID,
  };
  await postUpgradePremium(data).then(async () => {
    dialogUpgrade.value = false;
    await getRoomById(roomID);
  });
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
            <q-btn
              size="lg"
              class="q-mr-sm"
              flat
              color="orange-5"
              @click="$router.push('/admin/rooms/ranking')"
            >
              <i class="fa-solid fa-trophy text-orange-5 fa-xl"></i>
            </q-btn>

            <q-btn color="primary" size="lg" class="" flat>
              <i
                class="fa-solid fa-xl"
                :class="
                  statusAll ? 'fa-lock text-orange-5' : ' fa-unlock text-white'
                "
              >
              </i>
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
          @resetMatch="onResetMatch"
        />
      </div>
      <div class="col-12 col-md-3 q-px-md" v-if="auth.role_id != 1">
        <sharedComponent
          :code="room.room_user?.cod_compartir"
          :imgBase64="qrcode.encode"
          :key="loadingRoom ? 1 : 0"
          :download="qrcode.path"
        />
        <div class="name-quiniela">
          <p class="q-mb-none q-pl-md text-body2 text-weight-bold ellipsis">
            Lista de jugadores
            <span class="text-orange-5">
              {{ room.count_player || 0 }} /
              {{ room.room_user?.limit_player ?? '--' }}
            </span>
          </p>
          <div v-if="auth.role_id == 3">
            <q-btn
              class=""
              color="secondary"
              label="planes"
              @click="dialogUpgrade = true"
            />
            <DialogUpgrade
              v-model="dialogUpgrade"
              :category_id="room.category_room_id"
              @upgradePremium="upgradePremium"
              :vip="room.room_user?.vip"
            />
          </div>
        </div>

        <q-input
          dense
          dark
          filled
          v-model="search"
          type="text"
          placeholder="Buscar por nombre o ticket"
        >
          <template v-slot:append>
            <q-icon
              v-if="search != ''"
              class="cursor-pointer q-px-none"
              name="clear"
              size="xs"
              @click="search = ''"
            />
            <q-icon class="" name="search" />
          </template>
        </q-input>
        <q-list>
          <div v-for="player in filteredTicket" :key="player.id">
            <q-item>
              <q-item-section>
                <q-item-label>
                  <p class="q-mb-none text-subtitle1">
                    {{ player.ticket_factura }}
                  </p>
                  <span class="text-caption text-orange-5"
                    >{{ player.name }}
                  </span>
                </q-item-label>
              </q-item-section>
              <q-separator spaced inset vertical dark />
              <q-item-section avatar>
                <q-toggle
                  v-model="player.paid"
                  color="secondary"
                  :true-value="1"
                  :false-value="0"
                  @update:model-value="statusPaid(player)"
                />
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
