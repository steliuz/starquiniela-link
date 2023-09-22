<script setup lang="ts">
// import { ref } from 'vue';
import cardMatchsComponents from '../components/CardMatchs.vue';
import formPlayer from '../components/formPlayer.vue';
import { useRoomPlayer } from 'src/composables/useRoomPlayer';
import { useRoute } from 'vue-router';
// import { data } from 'pages/rooms/components/dataList';

const openDialog = () => {
  dialog.value = true;
};
const { getRoom, room, registerPlayer, postBet, dialog } = useRoomPlayer();

const router = useRoute();
getRoom(`${router.params.code}`);

const onSave = async (player: object) => {
  let check = false;
  room.value.matches?.map((match) => {
    if (match.predictTeam1 == null || match.predictTeam2 == null) check = true;
  });

  if (check) {
    alert('llenar apuesta');
    return;
  }
  await registerPlayer({ ...player, cod_compartir: router.params.code }).then(
    (resp) => {
      let data = {
        user_id: resp.userData.uid,
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
            predictTeam1: '',
            predictTeam2: '',
          };
        });
      });
    }
  );
};
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
      <div class="">
        <section class="q-mt-md q-mx-sm">
          <div class="container-box">
            <div class="box-room">
              <div class="title-cardMatchs">
                <p class="text-h5 text-white text-left">
                  {{ room.name || '' }}
                </p>
                <q-icon
                  class="cursor-pointer"
                  size="sm"
                  name="fa-solid fa-trophy"
                  color="warning"
                />
              </div>
              <div class="box-inside form">
                <formPlayer v-model="dialog" @savePlayer="onSave" />
              </div>
              <div class="box-inside rooms">
                <cardMatchsComponents
                  :dataMatch="room.matches"
                  :player="true"
                />
                <div class="q-mt-sm box-button">
                  <q-btn
                    class="full-width"
                    color="secondary"
                    label="JUGAR"
                    @click="openDialog"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
  // justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

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

    // .rooms {
    // }

    // .form {
    // }
  }
}
</style>
