<script setup lang="ts">
import { ref } from 'vue';
// import type { Ref } from 'vue';

import FormUser from './components/FormUser.vue';
import { user } from 'src/interfaces/user';

const dialogUser = ref(false);

const postUser = (value: user) => {
  console.log('value: ', value);
};
</script>
<template>
  <section class="q-ma-sm">
    <div class="row">
      <div class="col-12 flex justify-end">
        <q-btn
          class="q-mr-lg"
          color="primary"
          unelevated
          square
          label="Registrar usuario"
          @click="dialogUser = !dialogUser"
        />
      </div>
      <FormUser v-model="dialogUser" :postUser="postUser" />
    </div>
  </section>
</template>

<style scoped></style>
