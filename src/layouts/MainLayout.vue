<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-header-dark">
      <q-toolbar class="q-py-sm">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="flex items-center">
          <div>
            <p class="q-mb-none">{{ auth.name }}</p>
            <p class="text-caption text-secondary q-mb-none">{{ role }}</p>
          </div>
        </q-toolbar-title>

        <div class="flex flex-center">
          <span class="text-orange-5 text-h6">{{ auth.credits }}</span>

          <q-img
            v-if="showGif"
            class="q-ml-sm"
            width="35px"
            src="~assets/icons/coin.gif"
            :ratio="1 / 1"
            spinner-color="primary"
            spinner-size="82px"
          />
          <q-img
            v-else
            width="45px"
            src="~assets/icons/coin.png"
            :ratio="1 / 1"
          />
        </div>
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
import { computed, ref, onMounted } from 'vue';
import { logout } from 'src/services/auth/login';
import { useRouter } from 'vue-router';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useAuthStore } from 'src/stores/auth';
import { useMatch } from 'src/composables/useMatch';
import { storeToRefs } from 'pinia';

const showGif = ref(true);

const router = useRouter();
const { room_id: roomID, auth } = storeToRefs(useAuthStore());

const {} = useMatch(roomID);

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Inicio',
    caption: '',
    icon: 'home',
    link: '/admin/dashboard',
    roles: [1, 2, 3],
  },
  {
    title: 'Usuarios',
    caption: '',
    icon: 'person',
    link: '/admin/users',
    roles: [1, 2],
  },
  {
    title: 'Equipos',
    caption: '',
    icon: 'local_police',
    link: '/admin/teams',
    roles: [1],
  },
  {
    title: 'Publicidad',
    caption: '',
    icon: 'record_voice_over',
    link: '/admin/advertises',
    roles: [1],
  },
  {
    title: 'Quiniela',
    caption: '',
    icon: 'rss_feed',
    link: '/admin/rooms',
    roles: [1],
  },
  {
    title: 'Quiniela',
    caption: '',
    icon: 'rss_feed',
    link: '/admin/organizer/rooms',
    roles: [3],
  },
  {
    title: 'Categorías',
    caption: '',
    icon: 'public',
    link: '/admin/categories',
    roles: [1],
  },
];
const role = computed(() => {
  let name = 'Admin';
  if (auth.value.role_id == 2) name = 'Reseller';
  if (auth.value.role_id == 3) name = 'Organizador';
  return name;
});
const leftDrawerOpen = ref(false);

const handleLogout = async () => {
  try {
    await logout().finally(() => {
      router.push('/');
    });
  } catch (error) {
    console.log(error);
  }
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
  setTimeout(() => {
    showGif.value = !showGif.value;
  }, 5000);
});
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
