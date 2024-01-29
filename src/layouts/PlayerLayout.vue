<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :style="$q.dark.isActive ? 'background-color: transparent' : ''">
      <q-toolbar>
        <q-toolbar-title class="q-pa-sm">
          <q-img
            width="50px"
            src="~assets/logo/logo-white.png"
            spinner-color="primary"
            spinner-size="82px"
          />
        </q-toolbar-title>
        <div class="q-mr-md flex flex-center">
          <p class="q-mb-none q-mr-sm">Modo Oscuro</p>
          <ToggleComponent />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-img">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ToggleComponent from 'src/components/ToggleDarkComponent.vue';
</script>

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

.body--light {
  .bg-img {
    background-image: url('src/assets/bg-white.png');
  }
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
