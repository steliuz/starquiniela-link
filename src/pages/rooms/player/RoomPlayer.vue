<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import cardMatchsComponents from '../components/CardMatchs.vue';
import formPlayer from '../components/formPlayer.vue';
import { useRoomPlayer } from 'src/composables/useRoomPlayer';
import { useRoute, useRouter } from 'vue-router';
import { handleMessages } from 'src/services/notifys';
import sharedComponent from 'src/components/SharedComponent.vue';
import { useRooms } from 'src/composables/useRooms';
import { useAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';
import ToggleDarkComponent from 'src/components/ToggleDarkComponent.vue';
import { registerWorker } from 'src/composables/useRegisterServiceWorker';

const $q = useQuasar();
const openDialog = () => {
  dialog.value = true;
};
const { getRoomByCode, room, registerPlayer, postBet, dialog } =
  useRoomPlayer();

const { getQrRoom, qrcode, loading: loadingRoom } = useRooms();
const { setRoom } = useAuthStore();

const routes = useRouter();
const router = useRoute();

const dialogSuccess = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tickets: Ref<Array<any>> = ref([]);

const tempPlayer = ref();
const error_bet = ref(false);
const playerForm = ref({
  name: '',
  phone: '',
  email: '',
  tel: '',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSave = async (player: any) => {
  let check = false;
  let token_device = localStorage.getItem('token_device') || '';

  room.value.matches?.map((match) => {
    if (
      (match.predictTeam1 == null || match.predictTeam2 == null) &&
      match.status == 1 &&
      room.value.type != 3
    ) {
      console.log('1');
      check = true;
    } else if (
      match.predictTeam1 == null &&
      match.status == 1 &&
      room.value.type == 3
    ) {
      console.log('2', match.predictTeam1);
      check = true;
    }
  });

  if (check) {
    handleMessages({
      message: 'Debes llenar todas las predicciones',
      color: 'red-7',
      icon: 'info',
      position: 'center',
    });
    return;
  }

  if (error_bet.value == true) {
    postBet(tempPlayer.value)
      .then((resp) => {
        room.value.matches = room.value.matches?.map((match) => {
          return {
            ...match,
            predictTeam1: null,
            predictTeam2: null,
          };
        });
        dialogSuccess.value = true;

        let ticket = resp.ticket;

        let array_tickets = tickets.value;

        array_tickets.push(ticket);

        localStorage.setItem(
          'user_tickets_' + room.value.id,
          JSON.stringify(array_tickets)
        );
        error_bet.value = false;
        playerForm.value = {
          name: '',
          phone: '',
          email: '',
          tel: '',
        };
      })
      .catch(() => {
        error_bet.value = true;
      });
  } else {
    player.phone = player.phone;
    await registerPlayer({ ...player, cod_compartir: router.params.code }).then(
      (resp) => {
        let data = {
          user_id: resp.userData.uid,
          room_id: room.value.id,
          bets: room.value.matches?.map((match) => {
            return {
              match_id: match.id,
              goalsTeam1: match.predictTeam1,
              goalsTeam2: match.predictTeam2,
            };
          }),
          token_notification_device: token_device,
        };

        tempPlayer.value = data;

        postBet(data)
          .then((resp) => {
            room.value.matches = room.value.matches?.map((match) => {
              return {
                ...match,
                predictTeam1: null,
                predictTeam2: null,
              };
            });
            dialogSuccess.value = true;

            let ticket = resp.ticket;

            let array_tickets = tickets.value;

            array_tickets.push(ticket);

            localStorage.setItem(
              'user_tickets_' + room.value.id,
              JSON.stringify(array_tickets)
            );

            error_bet.value = false;
            playerForm.value = {
              name: '',
              phone: '',
              email: '',
              tel: '',
            };
            // let route = routes.resolve(`/ticket/${ticket.id}/pdf`);
            // window.open(route.href, '_blank');
          })
          .catch(() => {
            error_bet.value = true;
          });
      }
    );
  }
};

const goToTickets = (ticketID: string) => {
  let route = routes.resolve(`/ticket/${ticketID}/pdf`);
  window.open(route.href, '_blank');
};

const wsGroup = () => {
  window.open(room.value.room_user?.link_ws_groups, '_blank');
};

const checkResult = () => {
  let check = true;
  room.value.matches?.forEach((item) => {
    if (item.goalsTeam1 == null) check = false;
  });

  return check;
};

const checkStatusMatch = () => {
  let check = false;
  room.value.matches?.forEach((item) => {
    if (item.status == 1) check = true;
  });

  return check;
};

checkStatusMatch();

onMounted(async () => {
  await getRoomByCode(`${router.params.code}`);
  await getQrRoom(`${room.value.room_user?.cod_compartir}`);
  setRoom(room.value.id);

  tickets.value = JSON.parse(
    localStorage.getItem('user_tickets_' + room.value.id) || '[]'
  );
});

const onRegisterWorker = () => {
  registerWorker();
};

onMounted(() => {
  onRegisterWorker();
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      :class="$q.dark.isActive ? '' : 'bg-primary'"
      style="background-color: #010a0f"
    >
      <q-toolbar>
        <q-toolbar-title class="q-pa-sm">
          <q-img
            v-if="$q.dark.isActive"
            width="50px"
            src="~assets/logo/logo-white.png"
            spinner-color="primary"
            spinner-size="82px"
          />
          <q-img
            v-else
            width="50px"
            src="~assets/logo-white.png"
            spinner-color="primary"
            spinner-size="82px"
          />
        </q-toolbar-title>
        <div class="q-mr-md flex flex-center">
          <p class="q-mb-none q-mr-sm">Modo Oscuro qwe</p>
          <ToggleDarkComponent />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-img">
      <section class="q-mt-md q-mx-sm">
        <div class="container-box">
          <div class="box-room">
            <div class="title-cardMatchs">
              <p
                class="text-h6 text-left"
                :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                {{ room.name || '' }}
              </p>
              <div
                v-if="
                  room.matches?.length != 0 &&
                  !checkResult() &&
                  checkStatusMatch()
                "
                @click="$router.push('/players/rooms/ranking')"
              >
                <q-icon
                  class="cursor-pointer q-ml-md"
                  size="sm"
                  name="fa-solid fa-trophy"
                  color="warning"
                  v-if="room.room_user?.show_ranking == 1"
                />
              </div>
            </div>
            <div class="box-inside form">
              <formPlayer
                v-model="dialog"
                @savePlayer="onSave"
                :playerForm="playerForm"
              />
            </div>
            <div
              class="box-inside rooms"
              v-if="
                room.matches?.length != 0 &&
                !checkResult() &&
                checkStatusMatch()
              "
            >
              <cardMatchsComponents
                :type="room.type"
                :dataMatch="room.matches"
                :player="true"
              />
              <div class="q-mt-sm box-button">
                <q-btn
                  class="full-width"
                  color="secondary"
                  label="JUGAR"
                  @click="openDialog"
                  :disable="checkResult() || !checkStatusMatch()"
                />
              </div>
            </div>
            <div v-if="room.matches?.length != 0 && !checkStatusMatch()">
              <div class="flex justify-center">
                <p class="text-white text-h5 text-center">
                  Esta quiniela ya ha finalizado Puedes ver los resultados en la
                  tabla ranking
                </p>
                <q-icon
                  class="cursor-pointer q-ml-md"
                  size="xl"
                  name="fa-solid fa-trophy"
                  color="orange-5"
                  @click="$router.push('/players/rooms/ranking')"
                  v-if="room.room_user?.show_ranking == 1"
                />
              </div>
            </div>
          </div>
          <div>
            <sharedComponent
              class="q-md-ml-xl"
              :code="router.params.code"
              :imgBase64="qrcode.encode"
              :key="loadingRoom ? 1 : 0"
              :download="qrcode.path"
              @wsGroup="wsGroup"
              :hasWsGroup="room.room_user?.link_ws_groups"
            />

            <div
              v-if="tickets"
              class="q-mt-md bg-header-dark"
              :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
            >
              <p
                class="q-mb-xs text-bold text-center q-pa-sm"
                :class="$q.dark.isActive ? 'text-orange-5 ' : 'text-primary'"
              >
                Lista de Tickets
              </p>
              <div class="box-list-roomplayer">
                <q-list bordered>
                  <q-item
                    clickable
                    v-ripple
                    v-for="ticket in tickets"
                    :key="ticket.id"
                    @click="goToTickets(ticket.ticket_factura)"
                    class="border-item-list"
                  >
                    <q-item-section>
                      {{ ticket.ticket_factura }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        style="position: fixed; bottom: 5%; right: 5%"
        v-if="room.room_user?.user?.phone"
      >
        <a
          class="no-ancla"
          :href="`https://api.whatsapp.com/send?phone=${room.room_user?.user?.phone}&text=%20`"
          target="_blank"
        >
          <q-chip
            :color="$q.dark.isActive ? 'grey-3' : 'grey-5'"
            class="cursor-pointer no-padding text-black"
          >
            <q-avatar size="40px">
              <img src="~assets/icons/whatsapp2.png" />
            </q-avatar>
            <span class="q-pr-sm text-bold"> ¡Escribe al Organizador!</span>
          </q-chip>
        </a>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.body--light {
  .box-list-roomplayer {
    .border-item-list {
      border-bottom: 1px solid #b8b8b8;
    }
  }
}
.box-list-roomplayer {
  height: 100%;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.4em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: $secondary;
    border-radius: 500px;
  }

  .border-item-list {
    border-bottom: 1px solid #fff;
  }
}
.bg-img {
  // background-color: #010A0F;
  background-image: url('src/assets/bg-4.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  padding-bottom: 100px;
  width: 100vw;
  position: fixed;
  overflow-y: scroll;
}

.title-cardMatchs {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.container-box {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
  // flex-direction: column;

  .box-room {
    flex-grow: 0;
    flex-shrink: 0;
    display: grid;
    // grid-template-columns: 1.5fr repeat(1, minmax(300px, 2fr));
    grid-template-columns: 1fr;
    max-width: 520px;
    width: 90vw;
    padding-bottom: 100px;

    .box-inside {
      padding: 0 10px;
    }
  }
}

.body--light {
  .bg-img {
    background-image: url('src/assets/bg-white.png');
  }
}
</style>
