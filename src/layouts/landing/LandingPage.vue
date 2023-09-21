<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goLogin = () => {
  router.push('/');
};
</script>
<template>
  <div>
    <h2>Landing</h2>
    <q-btn color="primary" label="OK" @click="goLogin()" />
  </div>
</template>

<style scoped></style>
