<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-header-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      style="background-color: #010a0f; color: #fff"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="240"
    >
      <q-list>
        <q-item-label class="text-white" header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item class="absolute-bottom" tag="a">
          <q-item-section>
            <q-btn
              outline
              class="full-width"
              color="negative"
              label="Salir"
              @click="handleLogout"
            />
          </q-item-section>

          <!-- <q-item-section>
            <q-item-label>Salir</q-item-label>
          </q-item-section> -->
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-all-section">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { logout } from 'src/services/auth/login';
import { useRouter } from 'vue-router';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const router = useRouter();

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Inicio',
    caption: 'quasar.dev',
    icon: 'home',
    link: '/admin/dashboard',
  },
  {
    title: 'Usuarios',
    caption: 'github.com/quasarframework',
    icon: 'person',
    link: '/admin/users',
  },
  {
    title: 'Equipos',
    caption: 'chat.quasar.dev',
    icon: 'local_police',
    link: '/admin/teams',
  },
  {
    title: 'Publicidad',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '/admin/advertises',
  },
  {
    title: 'Quiniela',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: '/admin/rooms',
  },
  {
    title: 'Categorías',
    caption: '@QuasarFramework',
    icon: 'public',
    link: '/admin/categories',
  },
];

const leftDrawerOpen = ref(false);

const handleLogout = async () => {
  try {
    await logout().then(() => {
      router.push('/');
    });
  } catch (error) {
    console.log(error);
  }
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss" scoped>
.bg-all-section {
  background-color: #010a0f;
  color: #fff;
  height: 100vh;
  width: 100vw;
  position: fixed;
  overflow-y: auto;

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background: transparent;
    z-index: 12;
    overflow: visible;
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0px;
  }

  &::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: $secondary;
    border-radius: 10px;
    z-index: 12;
    transition: background-color 0.32s ease-in-out;
    min-height: 32px;
    min-width: 32px;
  }
}

.bg-menu {
  background-color: #010a0f;
  color: #fff;
}
</style>
