<template>
  <q-btn color="secondary" flat icon="share" @click="clipboard">
    <q-tooltip class="bg-primary"> Link para compartir</q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { vue_url } from 'src/boot/axios';
import { copyToClipboard } from 'quasar';
import { handleMessages } from 'src/services/notifys';

const props = defineProps(['code']);

const clipboard = () => {
  let url = `${vue_url}/rooms/${props.code}`;
  copyToClipboard(url)
    .then(() => {
      handleMessages({
        message: 'Link de compartir, copiado',
        color: 'secondary',
        icon: 'check',
        position: 'center',
      });
    })
    .catch(() => {
      handleMessages({
        message: 'Hubo un problema al intentar copiarlo',
        color: 'red-7',
        icon: 'closed',
        position: 'center',
      });
    });
};
</script>

<style scoped></style>
