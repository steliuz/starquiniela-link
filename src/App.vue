<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

const modeDarkStorage = localStorage.getItem('mode-dark');
const isDarkMode = modeDarkStorage === 'true';

$q.dark.set(isDarkMode);
</script>
