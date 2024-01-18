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
            <!-- <p
              class="text-caption q-mb-none"
              :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
            >
              {{ role }}
            </p> -->
          </div>
        </q-toolbar-title>

        <div class="flex flex-center">
          <div class="q-mr-md flex flex-center">
            <p class="q-mb-none q-mr-sm">Modo Oscuro</p>
            <ToggleComponent />
          </div>
          <div>
            <q-avatar class="cursor-pointer">
              <img class="border-white" src="~assets/icons/default.png" />
              <q-menu
                style="min-width: 200px"
                class="flex justify-center hide-scrollbar q-px-sm"
                square
                max-width="170px"
              >
                <div class="row no-wrap q-pa-md">
                  <div class="column items-center">
                    <q-avatar size="80px">
                      <img src="~assets/icons/default.png" />
                    </q-avatar>
                    <div
                      class="flex justify-center items-center"
                      style="margin-top: -10px; z-index: 1200"
                    >
                      <q-badge
                        class="q-py-xs q-px-sm"
                        :color="$q.dark.isActive ? 'secondary' : 'primary'"
                        rounded
                      >
                        <span class="text-bold text-white">
                          {{ role }}
                        </span>
                      </q-badge>
                    </div>

                    <!-- <div class="text-subtitle2 q-mt-xs">
                  <p class="ellipsis q-mt-sm q-mb-xs" style="max-width: 150px">
                    {{ store.$state.user.name }}
                  </p>
                </div> -->
                    <div class="column items-center q-mt-xs">
                      <div class="flex flex-center">
                        <div
                          class="flex flex-center text-center q-mx-sm"
                          v-if="auth.role_id != 1"
                        >
                          <span class="text-orange-5 text-h6">
                            {{ auth.credits }}
                          </span>

                          <!-- <q-img
                            v-if="showGif"
                            class="q-ml-sm"
                            width="35px"
                            src="~assets/icons/coin.gif"
                            :ratio="1 / 1"
                            spinner-color="primary"
                            spinner-size="82px"
                          /> -->
                          <q-img
                            width="30px"
                            src="~assets/icons/coin.png"
                            :ratio="1 / 1"
                          />
                        </div>
                      </div>

                      <q-btn
                        class="q-mt-md"
                        color="negative"
                        icon="logout"
                        label="Salir"
                        size="xs"
                        unelevated
                        v-close-popup
                        @click="handleLogout"
                      />
                    </div>
                  </div>
                </div>
              </q-menu>
            </q-avatar>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    

    <q-drawer
      class="bg-menu"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="240"
    >
      <q-list>
        <q-item-label
          :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
          header
        >
          StarQuiniela
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <!-- <q-item class="absolute-bottom">
          <q-item-section>
            <q-btn
              outline
              class="full-width"
              color="negative"
              label="Salir"
              @click="handleLogout"
            />
          </q-item-section>
        </q-item> -->
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


import ToggleComponent from 'src/components/ToggleDarkComponent.vue';
import { useAuthStore } from 'src/stores/auth';
import { useMatch } from 'src/composables/useMatch';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const showGif = ref(true);
// const modeDark = ref($q.dark.isActive);
const leftDrawerOpen = ref(false);

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

// const handleDark = () => {
//   $q.dark.toggle();

//   localStorage.setItem('mode-dark', modeDark.value.toString());
// };

onMounted(() => {
  setTimeout(() => {
    showGif.value = !showGif.value;
  }, 5000);
});
</script>

<style lang="scss" scoped></style>
