<script setup lang="ts">
import { onMounted, ref } from 'vue';
import cardMatchsComponents from '../components/CardMatchs.vue';
import formPlayer from '../components/formPlayer.vue';
import { useRoomPlayer } from 'src/composables/useRoomPlayer';
import { useRoute } from 'vue-router';
import { handleMessages } from 'src/services/notifys';
import sharedComponent from 'src/components/SharedComponent.vue';
import { useRooms } from 'src/composables/useRooms';
import { useAuthStore } from 'src/stores/auth';

const openDialog = () => {
  dialog.value = true;
};
const { getRoomByCode, room, registerPlayer, postBet, dialog } =
  useRoomPlayer();

const { getQrRoom, qrcode, loading: loadingRoom } = useRooms();
const { setRoom } = useAuthStore();

const router = useRoute();
// getRoomByCode(`${router.params.code}`);
const dialogSuccess = ref(false);
const onSave = async (player: object) => {
  let check = false;
  console.log('🚀 ~ file: RoomPlayer.vue:26 ~ onSave ~ check:', check);
  room.value.matches?.map((match) => {
    if (
      (match.predictTeam1 == null || match.predictTeam2 == null) &&
      match.status == 1
    )
      check = true;
  });

  console.log(
    '🚀 ~ file: RoomPlayer.vue:33 ~ room.value.matches?.map ~ check:',
    check
  );
  if (check) {
    handleMessages({
      message: 'Debes llenar todas las predicciones',
      color: 'red-7',
      icon: 'info',
      position: 'center',
    });
    return;
  }

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
      };
      postBet(data).then(() => {
        room.value.matches = room.value.matches?.map((match) => {
          return {
            ...match,
            predictTeam1: null,
            predictTeam2: null,
          };
        });
        dialogSuccess.value = true;
      });
    }
  );
};

onMounted(async () => {
  await getRoomByCode(`${router.params.code}`);
  await getQrRoom(`${room.value.room_user?.cod_compartir}`);
  setRoom(room.value.id);
});

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
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: transparent">
      <q-toolbar>
        <q-toolbar-title class="q-pa-sm">
          <q-img
            width="50px"
            src="/src/assets/logo/logo-white.png"
            spinner-color="primary"
            spinner-size="82px"
          />
        </q-toolbar-title>
        <div></div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-img">
      <section class="q-mt-md q-mx-sm">
        <div class="container-box">
          <div class="box-room">
            <div class="title-cardMatchs">
              <p class="text-h6 text-white text-left">
                {{ room.name || '' }}
              </p>
              <div
                v-if="room.matches?.length != 0 && !checkResult()"
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
              <formPlayer v-model="dialog" @savePlayer="onSave" />
            </div>
            <div
              class="box-inside rooms"
              v-if="room.matches?.length != 0 && !checkResult()"
            >
              <cardMatchsComponents :dataMatch="room.matches" :player="true" />
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
            <div v-if="room.matches?.length != 0 && checkResult()">
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
          <sharedComponent
            class="q-md-ml-xl"
            :code="router.params.code"
            :imgBase64="qrcode.encode"
            :key="loadingRoom ? 1 : 0"
            :download="qrcode.path"
          />
        </div>
      </section>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.bg-img {
  // background-color: #010A0F;
  background-image: url('src/assets/bg-4.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
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

@media screen and (max-width: 700px) {
}
</style>
