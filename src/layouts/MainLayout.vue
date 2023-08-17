<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
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

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <!-- <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          hide-expand-icon
          icon="home"
          label="Inicio"
          caption="5 unread emails"
        />
        <q-expansion-item
          expand-separator
          icon="person"
          label="Usuarios"
          caption="5 unread emails"
        >
          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            icon="receipt"
            label="Registrar"
            default-opened
          >
            <q-expansion-item
              switch-toggle-side
              dense-toggle
              label="Today"
              :header-inset-level="1"
              :content-inset-level="2"
            >
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              switch-toggle-side
              dense-toggle
              label="Yesterday"
              :header-inset-level="1"
              :content-inset-level="2"
            >
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-expansion-item>

          <q-expansion-item
            :header-inset-level="1"
            :content-inset-level="1"
            expand-separator
            icon="schedule"
            label="Postponed"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                numquam, dolorum officiis modi facere maiores architecto
                suscipit iste eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-expansion-item>

        <q-expansion-item
          :content-inset-level="0.5"
          expand-separator
          icon="mail"
          label="Inbox"
          caption="5 unread emails"
          default-opened
        >
          <q-expansion-item
            expand-separator
            :content-inset-level="0.5"
            icon="home"
            label="Inicio"
          >
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            :content-inset-level="0.5"
            icon="receipt"
            label="Receipts"
          >
            <q-expansion-item label="Today" :content-inset-level="0.5">
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item label="Yesterday" :content-inset-level="0.5">
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-expansion-item>

          <q-expansion-item
            :content-inset-level="0.5"
            expand-separator
            icon="schedule"
            label="Postponed"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                numquam, dolorum officiis modi facere maiores architecto
                suscipit iste eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-expansion-item>
      </q-list> -->
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

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

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
